import { spacing } from '@/lib/theme';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  padding?: number;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  scrollable = false,
  padding = spacing.md,
}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: colors.background}]}>
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={[{padding}, style]}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[{padding}, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
  },
});
