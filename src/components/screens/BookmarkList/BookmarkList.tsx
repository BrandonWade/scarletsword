import { useLayoutEffect, useState } from 'react';
import { ImageStyle, ScrollView, StyleProp } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import CardImageGrid from '../../common/CardImageGrid';
import { listBookmarks } from '../../../db/bookmarks';
import { BookmarkListItem, Card } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';

export default function BookmarkList() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const [bookmarks, setBookmarks] = useState<BookmarkListItem[]>([]);

  useLayoutEffect(() => {
    const fetchBookmarks = async () => {
      const result = await listBookmarks();
      setBookmarks(result);
    };

    fetchBookmarks();
  }, [isFocused]);

  const onPressResult = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, { cardID });
  };

  return (
    <ScrollView>
      <CardImageGrid
        cards={bookmarks as Card[]}
        renderCard={(card: Card, style: StyleProp<ImageStyle>) => (
          <CardImage
            key={card.id}
            style={style}
            card={card}
            shouldOverlayActions={true}
            onPress={onPressResult}
          />
        )}
      />
    </ScrollView>
  );
}
