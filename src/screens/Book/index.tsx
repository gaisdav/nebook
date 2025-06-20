import React, {useEffect} from 'react';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types.ts';
import {useTheme} from '@/hooks/useTheme';
import {spacing, borderRadius, typography, shadows} from '@/lib/theme';
import {Card} from '@/components/Card';
import {IconButton} from '@/components/IconButton';
import {
  Heart,
  BookOpen,
  BookMarked,
  CheckCircle,
  RotateCcw,
} from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import {getErrorMessage} from '@/lib/utils';

const {width} = Dimensions.get('window');

// Status constants - assuming these are the status IDs from the database
const BOOK_STATUS = {
  WANT_TO_READ: 1,
  READING: 2,
  READ: 3,
} as const;

export const BookScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const bookId = route.params?.bookId;

  const book = useBookStore(state => state.book);
  const loading = useBookStore(state => state.bookLoading);
  const favoriteLoading = useBookStore(state => state.favoriteLoading);
  const statusLoading = useBookStore(state => state.statusLoading);
  const fetchBook = useBookStore(state => state.fetchBook);
  const addToFavorite = useBookStore(state => state.addToFavorite);
  const removeFromFavorite = useBookStore(state => state.removeFromFavorite);
  const changeBookStatus = useBookStore(state => state.changeBookStatus);
  const resetBookStatus = useBookStore(state => state.resetBookStatus);

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

  const handleToggleFavorite = async () => {
    if (!bookId || !book) return;

    try {
      if (book.isFavorite) {
        await removeFromFavorite({
          bookId: bookId,
          userId: 1,
        });
      } else {
        await addToFavorite({
          bookId: bookId,
          userId: 1,
        });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  const handleChangeStatus = async (status: number) => {
    if (!bookId || !book) return;

    try {
      await changeBookStatus({
        bookId: bookId,
        userId: 1,
        status: status,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to update status',
        text2: errorMessage,
      });
    }
  };

  const handleResetStatus = async () => {
    if (!bookId || !book) return;

    try {
      await resetBookStatus({
        bookId: bookId,
        userId: 1,
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to reset status',
        text2: errorMessage,
      });
    }
  };

  const getStatusButtonStyle = (status: number) => {
    const isActive = book?.status === status;
    return {
      width: 48,
      height: 48,
      borderWidth: 2,
      borderRadius: 24,
      backgroundColor: isActive ? colors.primary : colors.background,
      borderColor: colors.border,
    };
  };

  const getStatusIconColor = (status: number) => {
    const isActive = book?.status === status;
    return isActive ? colors.textInverse : colors.textSecondary;
  };

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
    <ScreenWrapper scrollable>
      {/* Cover Image Section */}
      <View style={styles.coverSection}>
        <View style={styles.coverContainer}>
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
              style={[
                styles.placeholderCover,
                {backgroundColor: colors.backgroundSecondary},
                isDark ? shadows.dark.medium : shadows.light.medium,
              ]}>
              <Text
                style={[styles.placeholderText, {color: colors.textTertiary}]}>
                No Cover
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Actions Panel */}
      <Card
        style={[
          styles.actionsCard,
          {backgroundColor: colors.backgroundSecondary},
          isDark ? shadows.dark.small : shadows.light.small,
        ]}>
        <View style={styles.actionsContainer}>
          {/* Favorite Button */}
          <IconButton
            Icon={Heart}
            onPress={handleToggleFavorite}
            loading={favoriteLoading}
            iconColor={
              book?.isFavorite ? colors.textInverse : colors.textSecondary
            }
            style={{
              width: 48,
              height: 48,
              borderWidth: 2,
              borderRadius: 24,
              backgroundColor: book?.isFavorite
                ? colors.primary
                : colors.background,
              borderColor: colors.border,
            }}
            textStyle={{
              color: book?.isFavorite
                ? colors.textInverse
                : colors.textSecondary,
            }}
          />

          {/* Want to Read Button */}
          <IconButton
            Icon={BookMarked}
            onPress={() => handleChangeStatus(BOOK_STATUS.WANT_TO_READ)}
            loading={statusLoading}
            iconColor={getStatusIconColor(BOOK_STATUS.WANT_TO_READ)}
            style={getStatusButtonStyle(BOOK_STATUS.WANT_TO_READ)}
            textStyle={{
              color: getStatusIconColor(BOOK_STATUS.WANT_TO_READ),
            }}
          />

          {/* Reading Button */}
          <IconButton
            Icon={BookOpen}
            onPress={() => handleChangeStatus(BOOK_STATUS.READING)}
            loading={statusLoading}
            iconColor={getStatusIconColor(BOOK_STATUS.READING)}
            style={getStatusButtonStyle(BOOK_STATUS.READING)}
            textStyle={{
              color: getStatusIconColor(BOOK_STATUS.READING),
            }}
          />

          {/* Read Button */}
          <IconButton
            Icon={CheckCircle}
            onPress={() => handleChangeStatus(BOOK_STATUS.READ)}
            loading={statusLoading}
            iconColor={getStatusIconColor(BOOK_STATUS.READ)}
            style={getStatusButtonStyle(BOOK_STATUS.READ)}
            textStyle={{
              color: getStatusIconColor(BOOK_STATUS.READ),
            }}
          />

          {/* Reset Status Button */}
          {book.status && (
            <IconButton
              Icon={RotateCcw}
              onPress={handleResetStatus}
              loading={statusLoading}
              iconColor={colors.textSecondary}
              style={{
                width: 48,
                height: 48,
                borderWidth: 2,
                borderRadius: 24,
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
              textStyle={{
                color: colors.textSecondary,
              }}
            />
          )}
        </View>
      </Card>

      {/* Book Details Card */}
      <Card
        style={[
          styles.detailsCard,
          {backgroundColor: colors.backgroundSecondary},
          isDark ? shadows.dark.small : shadows.light.small,
        ]}>
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
          style={[
            styles.descriptionCard,
            {backgroundColor: colors.backgroundSecondary},
            isDark ? shadows.dark.small : shadows.light.small,
          ]}>
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
  coverContainer: {
    position: 'relative',
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
  actionsCard: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
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
