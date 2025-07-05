import React, {useCallback} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useTheme} from '@/hooks/common/useTheme';
import {useBookStore} from '@/data/books/store/useBookStore';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {Card} from '@/components/Card';
import {IBook, TBookStatus} from '@/data/books/enitites/book/types';
import {Skeleton} from '@/components/Skeleton';
import {spacing, borderRadius, typography} from '@/lib/theme';
import {useNavigation} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';

const STATUS_CONFIG: Record<
  TBookStatus,
  {title: string; color: string; icon: string}
> = {
  'want-to-read': {
    title: 'Want to Read',
    color: '#FF6B6B',
    icon: '📚',
  },
  reading: {
    title: 'Currently Reading',
    color: '#4ECDC4',
    icon: '📖',
  },
  read: {
    title: 'Finished Reading',
    color: '#45B7D1',
    icon: '✅',
  },
};

export const HomeScreen = (): React.JSX.Element => {
  const {colors} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {profile} = useAuthStore();
  const favoriteBooks = useBookStore(state => state.favoriteBooks);
  const collection = useBookStore(state => state.collection);
  const favoriteLoading = useBookStore(state => state.favoriteLoading);
  const collectionLoading = useBookStore(state => state.collectionLoading);
  const getFavoriteBooks = useBookStore(state => state.getFavoriteBooks);
  const fetchBooksByStatuses = useBookStore(
    state => state.fetchBooksByStatuses,
  );

  useFocusEffect(
    useCallback(() => {
      if (profile?.id) {
        getFavoriteBooks(profile.id);

        fetchBooksByStatuses({
          userId: profile.id,
          statuses: ['want-to-read', 'reading', 'read'],
        });
      }
    }, [profile?.id, getFavoriteBooks, fetchBooksByStatuses]),
  );

  const handleBookPress = useCallback(
    (bookId: string) => {
      navigation.navigate('Book', {bookId: bookId});
    },
    [navigation],
  );

  const renderBookCard = useCallback(
    ({item}: {item: IBook}) => (
      <View style={styles.bookCard}>
        <Card onPress={() => handleBookPress(item.id)}>
          <View style={styles.bookCardContent}>
            {item.cover ? (
              <Image style={styles.bookCover} source={{uri: item.cover}} />
            ) : (
              <View
                style={[
                  styles.placeholderCover,
                  {backgroundColor: colors.backgroundSecondary},
                ]}>
                <Text
                  style={[
                    styles.placeholderText,
                    {color: colors.textTertiary},
                  ]}>
                  📖
                </Text>
              </View>
            )}
            <View style={styles.bookInfo}>
              <Text
                style={[styles.bookTitle, {color: colors.text}]}
                numberOfLines={2}>
                {item.title}
              </Text>
              {item.authors && item.authors.length > 0 && (
                <Text
                  style={[styles.bookAuthor, {color: colors.textSecondary}]}
                  numberOfLines={1}>
                  {item.authors[0]}
                </Text>
              )}
            </View>
          </View>
        </Card>
      </View>
    ),
    [colors, handleBookPress],
  );

  const renderStatusSection = useCallback(
    (status: TBookStatus) => {
      const config = STATUS_CONFIG[status];
      const booksInStatus = Array.from(collection.values()).filter(
        book => book.status === status,
      );

      if (booksInStatus.length === 0) {
        return null;
      }

      return (
        <View style={styles.section} key={status}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>{config.icon}</Text>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              {config.title}
            </Text>
            <Text style={[styles.bookCount, {color: colors.textSecondary}]}>
              {booksInStatus.length}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={booksInStatus}
            renderItem={renderBookCard}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      );
    },
    [collection, colors, renderBookCard],
  );

  const renderFavoritesSection = useCallback(() => {
    const favoriteBooksArray = Array.from(favoriteBooks.values());

    if (favoriteBooksArray.length === 0) {
      return null;
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>❤️</Text>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            Favorites
          </Text>
          <Text style={[styles.bookCount, {color: colors.textSecondary}]}>
            {favoriteBooksArray.length}
          </Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={favoriteBooksArray}
          renderItem={renderBookCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  }, [favoriteBooks, colors, renderBookCard]);

  if (favoriteLoading || collectionLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingWrapper}>
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
        </View>
      </ScreenWrapper>
    );
  }

  const hasAnyBooks = favoriteBooks.size > 0 || collection.size > 0;

  return !hasAnyBooks ? (
    <ScreenWrapper>
      <Text style={styles.emptyIcon}>📚</Text>
      <Text style={[styles.emptyText, {color: colors.text}]}>
        Your library is empty
      </Text>
      <Text style={[styles.emptySubtext, {color: colors.textSecondary}]}>
        Start by searching for books and adding them to your collection
      </Text>
    </ScreenWrapper>
  ) : (
    <ScreenWrapper scrollable>
      {renderFavoritesSection()}
      {renderStatusSection('want-to-read')}
      {renderStatusSection('reading')}
      {renderStatusSection('read')}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingWrapper: {
    padding: spacing.md,
    gap: spacing.md,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    flex: 1,
  },
  bookCount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
  },
  horizontalList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bookCard: {
    width: 120,
    marginRight: spacing.md,
  },
  bookCardContent: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  placeholderCover: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  bookInfo: {
    alignItems: 'center',
    width: '100%',
  },
  bookTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
    lineHeight: typography.lineHeight.sm,
  },
  bookAuthor: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
  },
});
