import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export const Button = (props: TouchableOpacityProps) => {
  const { colors } = useTheme();

  return <TouchableOpacity {...props} style={[props.style, { backgroundColor: colors.primary }]} />;
};