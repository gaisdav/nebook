import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react-native';
import {borderRadius, spacing, typography} from '@/lib/theme';

interface PasswordInputProps extends TextInputProps {
  error?: string;
}

export const PasswordInput = ({error, ...props}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useTheme();

  return (
    <View style={{gap: spacing.xs}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.inputBackground,
          borderColor: error ? colors.error : colors.inputBorder,
          borderWidth: 1,
          borderRadius: borderRadius.md,
          height: 50,
          paddingLeft: spacing.sm,
          paddingRight: spacing.sm,
        }}>
        <TextInput
          {...props}
          style={[
            props.style,
            {
              flex: 1,
              color: colors.text,
              fontSize: typography.fontSize.md,
            },
          ]}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? (
            <Eye size={24} color={colors.text} />
          ) : (
            <EyeOff size={24} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={{color: colors.error, fontSize: typography.fontSize.sm}}>
          {error}
        </Text>
      )}
    </View>
  );
};
