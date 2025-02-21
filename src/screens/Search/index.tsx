import React, {useCallback, useLayoutEffect} from 'react';
import {FlatList, StyleSheet, Text, TextInput} from 'react-native';
import {IconButton} from '../../components/IconButton';
import {Search} from 'lucide-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {radius, size} from '../../commonStyles.ts';
import {Card} from '../../components/Card';
import {ScreenWrapper} from '../../components/ScreenWrapper';

type ListItem = {
  id: string;
  content: string;
};

const data: ListItem[] = [
  {
    id: '1',
    content: 'asdfasdf',
  },
  {
    id: '2',
    content: 'asdfasdf',
  },
  {
    id: '3',
    content: 'asdfasdf',
  },
  {
    id: '12',
    content: 'asdfasdf',
  },
  {
    id: '22',
    content: 'asdfasdf',
  },
  {
    id: '32',
    content: 'asdfasdf',
  },
];

export const SearchScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const inputRef = React.useRef<string>('');

  const submit = useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    console.log('submit', inputRef.current);
  }, []);

  const searchSubmitButton = useCallback(
    () => <IconButton Icon={Search} onPress={submit} />,
    [submit],
  );

  const headerTitle = useCallback(
    () => (
      <TextInput
        selectTextOnFocus
        autoFocus={true}
        style={styles.searchInput}
        placeholder="Search"
        returnKeyType="search"
        onChangeText={text => {
          inputRef.current = text;
        }}
        onSubmitEditing={submit}
      />
    ),
    [submit],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: searchSubmitButton,
      headerTitle: headerTitle,
    });
  }, [headerTitle, navigation, searchSubmitButton]);

  return (
    <ScreenWrapper padding={0}>
      <FlatList<ListItem>
        contentContainerStyle={styles.container}
        fadingEdgeLength={size.base10X}
        data={data}
        renderItem={({item}) => (
          <Card>
            <Text> {item.content}</Text>
            <Text> asdfasdf</Text>
            <Text> asdfasdf</Text>
            <Text> asdfasdf</Text>
            <Text> asdfasdf</Text>
            <Text> asdfasdf</Text>
            <Text> asdfasdf</Text>
          </Card>
        )}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: size.base3X,
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
