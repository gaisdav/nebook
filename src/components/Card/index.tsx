import React from 'react';
import {View, ViewStyle, StyleSheet, Pressable} from 'react-native';
import {shadows} from '@/lib/theme';
import {useTheme} from '@/hooks/common/useTheme';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle[];
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({children, style = [], onPress}) => {
  const {colors, isDark} = useTheme();
  const Wrapper = children ? Pressable : React.Fragment;

  return (
    <Wrapper onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundSecondary,
            ...shadows[isDark ? 'dark' : 'light'].small,
          },
          ...style,
        ]}>
        {children}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
  },
});
