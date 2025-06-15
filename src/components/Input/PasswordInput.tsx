import { View, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";

export const PasswordInput = (props: Omit<TextInputProps, 'secureTextEntry'>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
      }}>
      <TextInput
        {...props}
        style={[props.style]}
        placeholderTextColor={colors.inputPlaceholder}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible ? <Eye size={24} color={colors.text} /> : <EyeOff size={24} color={colors.text} />}
      </TouchableOpacity>
    </View>
  );
};