import RNFetchBlob from 'rn-fetch-blob';
import { insertCards, numberOfCards } from '../../db/cards';
import { Card } from './types/scryfall';

async function downloadFile(downloadUri: string) {
  console.log('Downloading data file');
  const fileName = downloadUri.slice(downloadUri.lastIndexOf('/') + 1);
  const response = await RNFetchBlob.config({
    fileCache: true,
    path: `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`,
  }).fetch('GET', downloadUri);
  if (response?.respInfo?.status !== 200 || !response?.readStream) {
    return;
  }

  console.log('Data file downloaded');
  return response;
}

async function readAndImportFile(filePath: string) {
  const fileStream = await RNFetchBlob.fs.readStream(filePath, 'utf8', 2048000);
  console.log('Importing data');

  let fragment = '';

  // Read each chunk and process it
  fileStream.onData(async chunk => {
    if (typeof chunk !== 'string') {
      return;
    }

    // If there is a fragment from a previous chunk, it's partial card data so combine it with the current chunk
    const lines = (fragment + chunk).split(/\n/);
    fragment = '';

    // Loop through each element and decide how to process it
    const cards: Card[] = [];
    lines.forEach(line => {
      if (line === '[' || line === ']') {
        // The file is formatted as one giant JSON array, so we need to exclude the brackets at the top level that wrap the actual content
        return;
      }

      try {
        // Remove the trailing comma and attempt to parse the string into an object
        const result = JSON.parse(line.slice(0, -1));
        cards.push(result);
      } catch {
        // If an error is thrown, it means that the line is a fragment of a row, so save it for the next chunk
        fragment = line;
      }
    });

    // Save the cards from this chunk to the DB
    await insertCards(cards);
  });

  // Clean up once we reach the end of the file
  fileStream.onEnd(async () => {
    if (fragment.length) {
      try {
        // Check and see if the final fragment is a card, and save it if so
        const card = JSON.parse(fragment);
        await insertCards([card]);
      } catch {}
    }

    const totalCards = await numberOfCards();
    console.log(`Data import complete - ${totalCards} cards in database`);
  });

  // Handle any errors that occur
  fileStream.onError(err => {
    throw err;
  });

  fileStream.open();
}

export default async function importFile(downloadUri: string) {
  // Download the bulk data file from scryfall and save it as a temporary file
  const downloadedFile = await downloadFile(downloadUri);
  if (!downloadedFile || !downloadedFile?.data) {
    console.log('Error downloading file');
    return;
  }

  try {
    // Read the data file in chunks and import it into the database
    await readAndImportFile(downloadedFile.data);
  } catch (err) {
    console.log('Error reading and importing file', err);
    return;
  }

  // Clean up the temporary file
  downloadedFile.flush();

  return '';
}
