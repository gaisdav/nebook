import React, {useEffect} from 'react';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types.ts';
import { useTheme } from '@/hooks/useTheme';
import {spacing, borderRadius} from '@/lib/theme';

const {width} = Dimensions.get('window');

export const BookScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const bookId = route.params?.bookId;

  const book = useBookStore(state => state.book);
  const loading = useBookStore(state => state.bookLoading);
  const fetchBook = useBookStore(state => state.fetchBook);

  const {colors} = useTheme();

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
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {book.cover && (
        <Image
          style={styles.cover}
          source={{
            uri: book.cover,
          }}
        />
      )}
      <Text>{book.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  cover: {
    width: width * 0.3,
    height: width * 0.45,
    borderRadius: borderRadius.md,
    resizeMode: 'contain',
  },
});
