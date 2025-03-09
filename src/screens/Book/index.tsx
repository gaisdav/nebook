import React, {useEffect} from 'react';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {Image, StyleSheet, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types.ts';
import {radius, size} from '@/commonStyles.ts';

export const BookScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const bookId = route.params?.bookId;

  const book = useBookStore(state => state.book);
  const loading = useBookStore(state => state.bookLoading);
  const fetchBook = useBookStore(state => state.fetchBook);

  useEffect(() => {
    if (!bookId) {
      return;
    }

    fetchBook({
      bookId: bookId,
      userId: 1,
    });
  }, [bookId, fetchBook]);

  if (!book && loading) {
    return (
      <ScreenWrapper>
        <Text>Loading...</Text>
      </ScreenWrapper>
    );
  }

  if (!book || !bookId) {
    return (
      <ScreenWrapper>
        <Text>Book not found</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {book.cover && (
        <Image
          style={styles.cover}
          source={{
            uri: book.cover,
          }}
        />
      )}
      <Text>{book.title}</Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: size.base15X,
    height: size.base20X,
    borderRadius: radius.base,
    resizeMode: 'contain',
  },
});
