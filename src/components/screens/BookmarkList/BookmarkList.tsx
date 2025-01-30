import { useLayoutEffect, useState } from 'react';
import { ImageStyle, ScrollView, StyleProp } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import CardImageGrid from '../../common/CardImageGrid';
import { createBookmark, deleteBookmark, listBookmarks } from '../../../db/bookmarks';
import { BookmarkCard } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';

export default function BookmarkList() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const [bookmarks, setBookmarks] = useState<BookmarkCard[]>([]);

  const fetchBookmarks = async () => {
    const result = await listBookmarks();
    setBookmarks(result);
  };

  useLayoutEffect(() => {
    fetchBookmarks();
  }, [isFocused]);

  const onPressResult = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, { cardID });
  };

  const onAddBookmark = async (cardID: string) => {
    await createBookmark(cardID);
    // TODO: Update card data
  };

  const onRemoveBookmark = async (cardID: string) => {
    await deleteBookmark(cardID);
    // TODO: Update card data
  };

  return (
    <ScrollView>
      <CardImageGrid
        cards={bookmarks}
        renderCard={(card: BookmarkCard, style: StyleProp<ImageStyle>) => (
          <CardImage
            key={card.id}
            style={style}
            card={card}
            shouldOverlayActions={true}
            onPress={onPressResult}
            onAddBookmark={onAddBookmark}
            onRemoveBookmark={onRemoveBookmark}
          />
        )}
      />
    </ScrollView>
  );
}
