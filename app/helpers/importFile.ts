import { Directory, File, Paths } from "expo-file-system/next";
import { insertCards, numberOfCards } from "../db/cards";
import { Card } from "./types/scryfall";

// Download the bulk data file from scryfall and return the saved file handle
async function downloadFile(downloadUri: string) {
  console.log("Retrieving data file");
  const fileName = downloadUri.slice(downloadUri.lastIndexOf("/") + 1);
  const directory = new Directory(Paths.cache, "bulkdata");
  if (!directory.exists) {
    directory.create();
  }

  const file = new File(directory, fileName);

  try {
    // Either download the file from the server or use the cached one instead if it exists
    if (!file.exists) {
      await File.downloadFileAsync(downloadUri, file);
      console.log("Data file downloaded");
    } else {
      console.log("Using cached data file");
    }
  } catch (err) {
    console.error("Error downloading file", err);
    throw err;
  }

  return file;
}

// Read the data file in chunks and import it into the database
async function importFile(file: File) {
  console.log("Importing data");
  const decoder = new TextDecoder();
  let cards: Card[] = [];
  let fragment = "";
  let total = 0;

  try {
    // Read each chunk and process it
    for await (const val of file.readableStream()) {
      const chunk = decoder.decode(val);

      // If there is a fragment from a previous chunk, it's partial card data so combine it with the current chunk
      const lines = (fragment + chunk).split(/\n/);
      fragment = "";

      // Loop through each element and decide how to process it

      lines.forEach((line) => {
        if (line === "[" || line === "]") {
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

      if (cards.length >= 1000) {
        await insertCards(cards);
        total += cards.length;
        console.log(`${total} cards processed`);
        cards = [];
      }
    }
  } catch (err) {
    console.error("Error importing bulk data file", err);
  }

  // Check and see if the final fragment is a card
  if (fragment.length) {
    try {
      const card = JSON.parse(fragment);
      cards.push(card);
    } catch {}
  }

  // Save any remaining cards
  if (cards.length) {
    await insertCards(cards);
  }

  const totalCards = await numberOfCards();
  console.log(`Data import complete - ${totalCards} cards in database`);
}

export default async function loadBulkDataFile(downloadUri: string) {
  const downloadedFile = await downloadFile(downloadUri);
  await importFile(downloadedFile);
}
