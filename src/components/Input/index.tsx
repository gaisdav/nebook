import {TextInput, TextInputProps, View, Text} from 'react-native';
import {useTheme} from '@/hooks/common/useTheme';
import {borderRadius, spacing, typography} from '@/lib/theme';

interface InputProps extends TextInputProps {
  error?: string;
}

export const Input = ({error, ...props}: InputProps) => {
  const {colors} = useTheme();

  return (
    <View>
      <TextInput
        {...props}
        style={[
          props.style,
          {
            height: 50,
            backgroundColor: colors.inputBackground,
            borderColor: error ? colors.error : colors.inputBorder,
            color: colors.text,
            borderWidth: 1,
            borderRadius: borderRadius.md,
            padding: spacing.sm,
            fontSize: typography.fontSize.md,
          },
        ]}
        placeholderTextColor={colors.inputPlaceholder}
      />
      {error && (
        <Text
          style={{
            color: colors.error,
            fontSize: typography.fontSize.sm,
            marginTop: spacing.xs,
            marginLeft: spacing.xs,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};
