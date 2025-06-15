import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { borderRadius, spacing, typography } from "@/lib/theme";

export const Input = (props: TextInputProps) => {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      style={[props.style, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder, color: colors.text,     borderWidth: 1,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: typography.fontSize.md, }]}
      placeholderTextColor={colors.inputPlaceholder}
    />
  );
};