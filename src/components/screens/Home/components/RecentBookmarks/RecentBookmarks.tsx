import { useLayoutEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../../../common/CardImage';
import { getRecentBookmarks } from '../../../../../db/bookmarks';
import { Card } from '../../../../../db/types';
import { ScreenNames } from '../../../../../utils/enums';
import { StackNavigation } from '../../../../../utils/navigation';

export default function RecentBookmarks() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigation>();
  const [bookmarks, setBookmarks] = useState<Card[]>([]);

  useLayoutEffect(() => {
    const fetchRecentBookmarks = async () => {
      const result = await getRecentBookmarks(5);
      setBookmarks(result);
    };

    fetchRecentBookmarks();
  }, [isFocused]);

  const onPressCard = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, {
      cardID,
    });
  };

  if (!bookmarks.length) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>Recent Bookmarks</Text>
      <ScrollView
        style={styles.cardImageGrid}
        contentContainerStyle={styles.cardImageContainer}
        horizontal={true}
      >
        {bookmarks.map((bookmark) => (
          <CardImage
            key={bookmark.id}
            style={[
              styles.cardImage,
              {
                maxHeight: Dimensions.get('window').height / 4,
              },
            ]}
            card={bookmark}
            hideActions={true}
            onPress={onPressCard}
          />
        ))}
      </ScrollView>
    </View>
  );
}
