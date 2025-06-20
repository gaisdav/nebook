import React, {useEffect} from 'react';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types.ts';
import {useTheme} from '@/hooks/useTheme';
import {spacing, borderRadius, typography, shadows} from '@/lib/theme';
import {Card} from '@/components/Card';

const {width} = Dimensions.get('window');

export const BookScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const bookId = route.params?.bookId;

  const book = useBookStore(state => state.book);
  const loading = useBookStore(state => state.bookLoading);
  const fetchBook = useBookStore(state => state.fetchBook);

  const {colors, isDark} = useTheme();

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
        <View
          style={[
            styles.loadingContainer,
            {backgroundColor: colors.background},
          ]}>
          <Text style={[styles.loadingText, {color: colors.textSecondary}]}>
            Loading...
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (!book || !bookId) {
    return (
      <ScreenWrapper>
        <View
          style={[styles.errorContainer, {backgroundColor: colors.background}]}>
          <Text style={[styles.errorText, {color: colors.textSecondary}]}>
            Book not found
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  const formatYear = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? 'Unknown' : year.toString();
  };

  const formatAuthors = (authors?: string[]) => {
    if (!authors || authors.length === 0) return null;
    return authors.join(', ');
  };

  const formatGenres = (categories?: string[]) => {
    if (!categories || categories.length === 0) return null;
    return categories.slice(0, 3).join(' • ');
  };

  const genres = formatGenres(book.categories);
  const authors = formatAuthors(book.authors);

  return (
    <ScreenWrapper scrollable style={styles.container}>
      {/* Cover Image Section */}
      <View style={styles.coverSection}>
        {book.cover ? (
          <Image
            style={[
              styles.cover,
              isDark ? shadows.dark.medium : shadows.light.medium,
            ]}
            source={{uri: book.cover}}
          />
        ) : (
          <View
            style={
              [
                styles.placeholderCover,
                {backgroundColor: colors.backgroundSecondary},
                isDark ? shadows.dark.medium : shadows.light.medium,
              ] as any
            }>
            <Text
              style={[styles.placeholderText, {color: colors.textTertiary}]}>
              No Cover
            </Text>
          </View>
        )}
      </View>

      {/* Book Details Card */}
      <Card
        style={
          [
            styles.detailsCard,
            {backgroundColor: colors.backgroundSecondary},
            isDark ? shadows.dark.small : shadows.light.small,
          ] as any
        }>
        {/* Title */}
        <Text style={[styles.title, {color: colors.text}]} numberOfLines={3}>
          {book.title}
        </Text>

        {/* Subtitle */}
        {book.subtitle && (
          <Text
            style={[styles.subtitle, {color: colors.textSecondary}]}
            numberOfLines={2}>
            {book.subtitle}
          </Text>
        )}

        {/* Author */}
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textTertiary}]}>
            Author
          </Text>
          <Text
            style={[
              styles.infoValue,
              {color: authors ? colors.text : colors.textSecondary},
            ]}
            numberOfLines={2}>
            {authors || 'Unknown Author'}
          </Text>
        </View>

        {/* Publication Year */}
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textTertiary}]}>
            Published
          </Text>
          <Text style={[styles.infoValue, {color: colors.text}]}>
            {formatYear(book.publishedDate)}
          </Text>
        </View>

        {/* Genre */}
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, {color: colors.textTertiary}]}>
            Genre
          </Text>
          <Text
            style={[
              styles.infoValue,
              {color: genres ? colors.text : colors.textSecondary},
            ]}
            numberOfLines={2}>
            {genres || 'No genre specified'}
          </Text>
        </View>

        {/* Publisher */}
        {book.publisher && (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, {color: colors.textTertiary}]}>
              Publisher
            </Text>
            <Text
              style={[styles.infoValue, {color: colors.text}]}
              numberOfLines={1}>
              {book.publisher}
            </Text>
          </View>
        )}

        {/* Page Count */}
        {book.pageCount && (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, {color: colors.textTertiary}]}>
              Pages
            </Text>
            <Text style={[styles.infoValue, {color: colors.text}]}>
              {book.pageCount}
            </Text>
          </View>
        )}
      </Card>

      {/* Description Section */}
      {book.description && (
        <Card
          style={
            [
              styles.descriptionCard,
              {backgroundColor: colors.backgroundSecondary},
              isDark ? shadows.dark.small : shadows.light.small,
            ] as any
          }>
          <Text style={[styles.descriptionTitle, {color: colors.text}]}>
            Description
          </Text>
          <Text style={[styles.description, {color: colors.textSecondary}]}>
            {book.description}
          </Text>
        </Card>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
  },
  coverSection: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  cover: {
    width: width * 0.4,
    height: width * 0.6,
    borderRadius: borderRadius.lg,
  },
  placeholderCover: {
    width: width * 0.4,
    height: width * 0.6,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  placeholderText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },
  detailsCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    lineHeight: typography.lineHeight.xxl,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.lg,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    flex: 0.3,
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    flex: 0.7,
    textAlign: 'right',
  },
  descriptionCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  descriptionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.md,
  },
});
