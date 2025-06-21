import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@/hooks/common/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary';
}

export const Button = ({variant = 'primary', style, ...props}: ButtonProps) => {
  const {colors} = useTheme();

  const buttonStyle =
    variant === 'primary'
      ? [styles.button, {backgroundColor: colors.primary}, style]
      : [
          styles.button,
          {
            backgroundColor: 'transparent',
            borderColor: colors.primary,
            borderWidth: 1,
          },
          style,
        ];

  return <TouchableOpacity {...props} style={buttonStyle} />;
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
