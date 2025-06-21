import React from 'react';
import {Text} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useTheme} from '@/hooks/useTheme';

export const HomeScreen = (): React.JSX.Element => {
  const {colors} = useTheme();

  return (
    <ScreenWrapper>
      <Text style={[{color: colors.text}]}>HomeScreen</Text>
    </ScreenWrapper>
  );
};
