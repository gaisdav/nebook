import React from 'react';
import {View, StyleSheet, Animated, Easing, DimensionValue} from 'react-native';
import {borderRadius as borderRadiusTheme} from '@/lib/theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 40,
  borderRadius = borderRadiusTheme.md,
  variant = 'rect',
}) => {
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-100%', '100%'],
  });

  return (
    <View
      style={[
        styles.skeleton,
        {width, height, borderRadius},
        variant === 'circle' && {borderRadius: (height as number) / 2},
      ]}>
      <Animated.View style={[styles.shimmer, {transform: [{translateX}]}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E1E1E1',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
