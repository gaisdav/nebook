import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {useTheme} from '@/hooks/common/useTheme';

export function LoadingScreen() {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text
        style={{
          marginTop: 16,
          fontSize: 16,
          color: colors.text,
          fontWeight: '500',
        }}>
        Loading...
      </Text>
    </View>
  );
}
