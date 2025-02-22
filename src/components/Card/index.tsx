import React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {theme} from '@/commonStyles.ts';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    ...theme.light.shadow.base,
  },
});
