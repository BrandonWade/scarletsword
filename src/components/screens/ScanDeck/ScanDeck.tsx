import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { StackNavigation } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import styles from './styles';
import { ScreenNames } from '../../../utils/enums';
import { exportDeck, listDecks } from '../../../db/decks';
import { useEffect, useState } from 'react';

export default function ScanDeck() {
  const navigation = useNavigation<StackNavigation>();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      console.log('Code scanned:', codes);
    },
  });
  const [sampleDecks, setSampleDecks] = useState([]);

  useEffect(() => {
    if (!__DEV__) return;

    async function fetchSampleDecks() {
      const decks = await listDecks();
      if (!decks?.length) {
        return;
      }

      setSampleDecks(decks);
    }

    fetchSampleDecks();
  }, []);

  return (
    <View style={styles.container}>
      {device ? (
        <Camera device={device} codeScanner={codeScanner} isActive={true} />
      ) : (
        <View>
          <Text style={commonStyles.titleLg}>Camera not found</Text>
          {sampleDecks.map((deck) => {
            return (
              <Button
                key={deck.id}
                title={deck.name}
                onPress={async () => {
                  const deckData = await exportDeck(deck.id);
                  navigation.navigate(ScreenNames.PreviewDeck, {
                    deckData: JSON.stringify(deckData),
                  });
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}
