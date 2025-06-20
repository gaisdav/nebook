import {View, TextInput, TextInputProps, TouchableOpacity} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react-native';
import {borderRadius, spacing, typography} from '@/lib/theme';

export const PasswordInput = (
  props: Omit<TextInputProps, 'secureTextEntry'>,
) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.inputBackground,
        borderColor: colors.inputBorder,
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
  );
};
