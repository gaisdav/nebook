import React from 'react';
import {View, ViewStyle, StyleSheet, Pressable} from 'react-native';
import {shadows} from '@/lib/theme';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({children, style, onPress}) => {
  const Wrapper = children ? Pressable : React.Fragment;

  return (
    <Wrapper onPress={onPress}>
      <View style={[styles.card, style]}>{children}</View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    ...shadows.light.small,
  },
});
