import React, {useCallback, useLayoutEffect} from 'react';
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
import {IconButton} from '@/components/IconButton';
import {Search} from 'lucide-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Card} from '@/components/Card';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {IBook} from '@/data/books/enitites/book/types.ts';
import {Skeleton} from '@/components/Skeleton';
import { useTheme } from '@/hooks/useTheme';
import {spacing, borderRadius, typography} from '@/lib/theme';

const {width} = Dimensions.get('window');

export const SearchScreen = (): React.JSX.Element => {
  const list = useBookStore(state => state.list);
  const listLoading = useBookStore(state => state.listLoading);
  const fetchList = useBookStore(state => state.fetchPaginatedList);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {colors} = useTheme();

  const inputRef = React.useRef<string>('');

  const submit = useCallback(
    (page = 1) => {
      if (!inputRef.current) {
        return;
      }

      Keyboard.dismiss();
      fetchList({query: inputRef.current, page});
    },
    [fetchList],
  );

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

  const searchSubmitButton = useCallback(
    () => (
      <IconButton Icon={Search} onPress={handleSubmit} />
    ),
    [handleSubmit],
  );

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
        onChangeText={text => {
          inputRef.current = text;
        }}
        onSubmitEditing={handleSubmit}
      />
    ),
    [handleSubmit, colors],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: searchSubmitButton,
      headerTitle: headerTitle,
    });
  }, [headerTitle, navigation, searchSubmitButton]);

  const hasMore = Boolean(
    inputRef.current && list?.totalItems && list.totalItems > list.items.size,
  );

  const handleEndReached = () => {
    if (hasMore && list) {
      submit(list.page + 1);
    }
  };

  const renderItem = useCallback(
    ({item}: {item: IBook}) => (
      <View style={styles.cardContainer}>
        <Card>
          {item.cover && (
            <Image
              style={styles.cover}
              source={{
                uri: item.cover,
              }}
            />
          )}
          {item.title && (
            <Text style={[styles.title, {color: colors.text}]} ellipsizeMode="tail">
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
        </Card>
      </View>
    ),
    [colors],
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {listLoading ? (
        <View style={styles.loadingWrapper}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </View>
      ) : !list ? (
        <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
          Type something to search
        </Text>
      ) : (
        <FlatList<IBook>
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleEndReached}
          data={Array.from(list.items.values())}
          ListFooterComponent={hasMore ? ActivityIndicator : null}
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
    marginBottom: spacing.md,
  },
  cover: {
    width: width * 0.3,
    height: width * 0.45,
    borderRadius: borderRadius.md,
    resizeMode: 'contain',
    marginBottom: spacing.sm,
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
