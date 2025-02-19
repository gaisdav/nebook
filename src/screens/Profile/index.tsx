import {SafeAreaView, Text} from 'react-native';
import React, {useCallback, useLayoutEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {IconButton} from '../../components/IconButton';
import {Settings} from 'lucide-react-native';

export const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const headerRight = useCallback(
    () => (
      <IconButton
        Icon={Settings}
        onPress={() => navigation.navigate('Settings')}
      />
    ),
    [navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  );
};
