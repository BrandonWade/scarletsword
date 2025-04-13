import { useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RouteProp, useRoute } from '@react-navigation/native';
import { exportDeckCards } from '../../../db/decks';
import { ExportResult } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackParamsList } from '../../../utils/navigation';
import commonStyles from '../../../utils/styles';
import styles from './styles';

export default function ShareDeck() {
  const route = useRoute<RouteProp<StackParamsList, ScreenNames.ShareDeck>>();
  const { id, name } = route.params || {};
  const [exportValue, setExportValue] = useState<string>();

  useLayoutEffect(() => {
    const fetchDeckCards = async () => {
      const result: ExportResult = await exportDeckCards(id);
      if (!result?.export) {
        return;
      }

      setExportValue(
        JSON.stringify({
          name,
          cards: result.export,
        })
      );
    };

    if (id) {
      fetchDeckCards();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={[commonStyles.titleLg]}>{name}</Text>
      {exportValue ? <QRCode value={exportValue} size={250} /> : null}
      <Text style={styles.scanMessage}>
        To share this deck, open the app on another device and scan the QR code.
      </Text>
    </View>
  );
}
