import React, {useCallback, useLayoutEffect} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {IconButton} from '../../components/IconButton';
import {Search} from 'lucide-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {size10X} from '../../commonStyles.ts';

export const SearchScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [inputValue, setInputValue] = React.useState('');

  const submit = useCallback(() => {
    if (!inputValue) {
      return;
    }

    console.log('submit', inputValue);
  }, [inputValue]);

  const searchSubmitButton = useCallback(
    () => <IconButton Icon={Search} onPress={submit} />,
    [submit],
  );

  const headerTitle = useCallback(
    () => (
      <TextInput
        autoFocus={true}
        value={inputValue}
        style={styles.searchInput}
        placeholder="Search"
        returnKeyType="search"
        onChangeText={setInputValue}
        onSubmitEditing={submit}
      />
    ),
    [inputValue, submit],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: searchSubmitButton,
      headerTitle: headerTitle,
    });
  }, [headerTitle, navigation, searchSubmitButton]);

  return <Text>SearchScreen</Text>;
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
    height: size10X,
  },
});
