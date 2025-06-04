import { useLayoutEffect, useState } from 'react';
import { ImageStyle, SafeAreaView, ScrollView, StyleProp } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from './styles';
import CardImage from '../../common/CardImage';
import CardImageGrid from '../../common/CardImageGrid';
import { createBookmark, deleteBookmark, listBookmarks } from '../../../db/bookmarks';
import { Card } from '../../../db/types';
import { ScreenNames } from '../../../utils/enums';
import { StackNavigation } from '../../../utils/navigation';

export default function BookmarkList() {
  const navigation = useNavigation<StackNavigation>();
  const isFocused = useIsFocused();
  const [bookmarks, setBookmarks] = useState<Card[]>([]);
  const [bookmarkIDs, setBookmarkIDs] = useState(new Set());

  const fetchBookmarks = async () => {
    const result = await listBookmarks();
    setBookmarks(result);

    setBookmarkIDs(new Set(result.map((bookmark) => bookmark.id)));
  };

  useLayoutEffect(() => {
    fetchBookmarks();
  }, [isFocused]);

  const onPressResult = (cardID: string) => {
    navigation.navigate(ScreenNames.Card, { cardID });
  };

  const onAddBookmark = async (cardID: string) => {
    await createBookmark(cardID);
    await fetchBookmarks();
  };

  const onRemoveBookmark = async (cardID: string) => {
    await deleteBookmark(cardID);
    await fetchBookmarks();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <CardImageGrid
          cards={bookmarks}
          renderCard={(card: Card, style: StyleProp<ImageStyle>) => (
            <CardImage
              key={card.id}
              style={style}
              card={card}
              isBookmarked={bookmarkIDs.has(card.id)}
              overlayActions={true}
              onPress={onPressResult}
              onAddBookmark={onAddBookmark}
              onRemoveBookmark={onRemoveBookmark}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
