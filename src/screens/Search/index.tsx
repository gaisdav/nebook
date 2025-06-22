import React, {
  useCallback,
  useDeferredValue,
  useLayoutEffect,
  useState,
} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Card} from '@/components/Card';
import {IBook} from '@/data/books/enitites/book/types.ts';
import {Skeleton} from '@/components/Skeleton';
import {useTheme} from '@/hooks/common/useTheme';
import {spacing, borderRadius, typography} from '@/lib/theme';
import {useBook} from '@/hooks/books/useBooks';

const {width} = Dimensions.get('window');

export const SearchScreen = (): React.JSX.Element => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const {books, isBooksLoading, fetchNextPage, hasNextPage} = useBook({
    fetchList: query.length > 0,
    query: deferredQuery,
  });

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {colors} = useTheme();

  const headerTitle = useCallback(
    () => (
      <TextInput
        selectTextOnFocus
        autoFocus={true}
        submitBehavior="blurAndSubmit"
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.backgroundSecondary,
            color: colors.text,
          },
        ]}
        placeholder="Search"
        placeholderTextColor={colors.textTertiary}
        returnKeyType="search"
        onChangeText={setQuery}
      />
    ),
    [colors],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    });
  }, [headerTitle, navigation]);

  const handleEndReached = () => {
    if (hasNextPage && !isBooksLoading) {
      fetchNextPage();
    }
  };

  const handleBookPress = useCallback(
    (bookId: string) => {
      navigation.navigate('Book', {bookId: bookId});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: IBook}) => (
      <View style={styles.cardContainer}>
        <Card onPress={() => handleBookPress(item.id)}>
          <View style={styles.cardContent}>
            {item.cover && (
              <Image
                style={styles.cover}
                source={{
                  uri: item.cover,
                }}
              />
            )}
            <View style={styles.textContainer}>
              {item.title && (
                <Text
                  style={[styles.title, {color: colors.text}]}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
              )}
              {item.description && (
                <Text
                  style={[styles.description, {color: colors.textSecondary}]}
                  numberOfLines={4}
                  ellipsizeMode="tail">
                  {item.description}
                </Text>
              )}
            </View>
          </View>
        </Card>
      </View>
    ),
    [colors, handleBookPress],
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {isBooksLoading ? (
        <View style={styles.loadingWrapper}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </View>
      ) : !books ? (
        <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
          Type something to search
        </Text>
      ) : (
        <FlatList<IBook>
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleEndReached}
          data={Array.from(books.items.values())}
          ListFooterComponent={hasNextPage ? ActivityIndicator : null}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  cardContainer: {
    marginBottom: spacing.xs,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cover: {
    width: width * 0.2,
    height: width * 0.3,
    borderRadius: borderRadius.md,
    resizeMode: 'contain',
    marginLeft: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  textContainer: {
    flex: 1,
    padding: spacing.md,
  },
  loadingWrapper: {
    flex: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  searchInput: {
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    width: '90%',
    height: 40,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
