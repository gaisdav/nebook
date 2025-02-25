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
} from 'react-native';
import {IconButton} from '@/components/IconButton';
import {Search} from 'lucide-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {radius, size, theme} from '@/commonStyles.ts';
import {Card} from '@/components/Card';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useBookStore} from '@/data/books/store/useBookStore.tsx';
import {IBook} from '@/data/books/enitites/book/types.ts';
import {Skeleton} from '@/components/Skeleton';

export const SearchScreen = (): React.JSX.Element => {
  const list = useBookStore(state => state.list);
  const listLoading = useBookStore(state => state.listLoading);
  const fetchList = useBookStore(state => state.fetchPaginatedList);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    () => <IconButton Icon={Search} onPress={handleSubmit} />,
    [handleSubmit],
  );

  const headerTitle = useCallback(
    () => (
      <TextInput
        selectTextOnFocus
        autoFocus={true}
        submitBehavior="blurAndSubmit"
        style={styles.searchInput}
        placeholder="Search"
        returnKeyType="search"
        onChangeText={text => {
          inputRef.current = text;
        }}
        onSubmitEditing={handleSubmit}
      />
    ),
    [handleSubmit],
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

  return (
    <ScreenWrapper padding={0}>
      {listLoading ? (
        <View style={styles.loadingWrapper}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </View>
      ) : !list ? (
        <Text>Type something to search</Text>
      ) : (
        <FlatList<IBook>
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          fadingEdgeLength={size.base20X}
          onEndReached={handleEndReached}
          data={Array.from(list.items.values())}
          ListFooterComponent={hasMore ? ActivityIndicator : null}
          renderItem={({item}) => {
            const coverUri = item.cover?.replace('http://', 'https://');

            return (
              <Card>
                {item.cover && (
                  <Image
                    style={styles.cover}
                    source={{
                      uri: coverUri,
                    }}
                  />
                )}
                {item.title && <Text ellipsizeMode="tail">{item.title}</Text>}
                {item.description && (
                  <Text numberOfLines={4} ellipsizeMode="tail">
                    {item.description}
                  </Text>
                )}
              </Card>
            );
          }}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: size.base3X,
    padding: size.base4X,
  },
  cover: {
    width: size.base15X,
    height: size.base20X,
    borderRadius: radius.base,
    resizeMode: 'contain',
  },
  loadingWrapper: {
    height: '100%',
    gap: size.base3X,
    padding: size.base4X,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: size.base2X,
    borderRadius: radius.base,
    width: '90%',
    height: size.base10X,
  },
});
