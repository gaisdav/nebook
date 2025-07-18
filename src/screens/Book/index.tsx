import React from 'react';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/types.ts';
import {useTheme} from '@/hooks/common/useTheme';
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
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {useBook} from '@/hooks/books/useBooks';
import {Editor} from '@/components/Editor';
import {TBookStatus} from '@/data/books/enitites/book/types.ts';
import {useComments, useCreateComment} from '@/hooks/comments/useComments';
import WebView from 'react-native-webview';

const {width} = Dimensions.get('window');

export const BookScreen = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const bookId = route.params?.bookId;
  const {profile} = useAuthStore();
  const {
    comments,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useComments({
    bookId: bookId ?? '',
  });
  const {createComment, isLoading: createCommentLoading} = useCreateComment({
    bookId: bookId ?? '',
    userId: profile?.id ?? 0,
  });
  const favoriteLoading = useBookStore(state => state.favoriteLoading);
  const statusLoading = useBookStore(state => state.statusLoading);
  const addToFavorite = useBookStore(state => state.addToFavorite);
  const removeFromFavorite = useBookStore(state => state.removeFromFavorite);
  const changeBookStatus = useBookStore(state => state.changeBookStatus);
  const resetBookStatus = useBookStore(state => state.resetBookStatus);

  const {book, isBookLoading, refetchBook} = useBook({
    bookId: bookId,
    userId: profile?.id,
    fetchBook: true,
    fetchFavorite: true,
  });

  const userId = Number(profile?.id);

  const {colors, isDark} = useTheme();

  const handleToggleFavorite = async () => {
    if (!bookId || !book) {
      return;
    }

    try {
      if (book.isFavorite) {
        await removeFromFavorite({
          bookId: bookId,
          userId: userId,
        });
      } else {
        await addToFavorite({
          bookId: bookId,
          userId: userId,
        });
      }
      await refetchBook();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  const handleChangeStatus = async (status: TBookStatus) => {
    if (!bookId || !book) {
      return;
    }

    try {
      await changeBookStatus({
        bookId: bookId,
        userId: userId,
        status: status,
      });
      await refetchBook();
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
    if (!bookId || !book) {
      return;
    }

    try {
      await resetBookStatus({
        bookId: bookId,
        userId: userId,
      });
      await refetchBook();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to reset status',
        text2: errorMessage,
      });
    }
  };

  const getStatusButtonStyle = (status: TBookStatus) => {
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

  const getStatusIconColor = (status: TBookStatus) => {
    const isActive = book?.status === status;
    return isActive ? colors.textInverse : colors.textSecondary;
  };

  if (!book && isBookLoading) {
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
    if (!dateString) {
      return 'Unknown';
    }
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? 'Unknown' : year.toString();
  };

  const formatAuthors = (authors?: string[]) => {
    if (!authors || authors.length === 0) {
      return null;
    }
    return authors.join(', ');
  };

  const formatGenres = (categories?: string[]) => {
    if (!categories || categories.length === 0) {
      return null;
    }
    return categories.slice(0, 3).join(' • ');
  };

  const genres = formatGenres(book.categories);
  const authors = formatAuthors(book.authors);

  const handleCreateComment = async (content: string) => {
    if (!bookId || !userId) {
      return;
    }

    content = content.trim();

    await createComment({
      bookId: bookId,
      userId: userId,
      content: content,
    });

    await refetchComments();
  };

  console.log(comments);

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
            onPress={() => handleChangeStatus('want-to-read')}
            loading={statusLoading}
            iconColor={getStatusIconColor('want-to-read')}
            style={getStatusButtonStyle('want-to-read')}
            textStyle={{
              color: getStatusIconColor('want-to-read'),
            }}
          />

          {/* Reading Button */}
          <IconButton
            Icon={BookOpen}
            onPress={() => handleChangeStatus('reading')}
            loading={statusLoading}
            iconColor={getStatusIconColor('reading')}
            style={getStatusButtonStyle('reading')}
            textStyle={{
              color: getStatusIconColor('reading'),
            }}
          />

          {/* Read Button */}
          <IconButton
            Icon={CheckCircle}
            onPress={() => handleChangeStatus('read')}
            loading={statusLoading}
            iconColor={getStatusIconColor('read')}
            style={getStatusButtonStyle('read')}
            textStyle={{
              color: getStatusIconColor('read'),
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

      {commentsLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading comments...</Text>
        </View>
      )}

      {comments.map(comment => (
        <View key={comment.id} style={{height: 100}}>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>${comment.content}
</body>
</html>`,
            }}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            style={{flex: 1, height: 100}}
          />
        </View>
      ))}

      {book && <Editor onSave={handleCreateComment} />}
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
