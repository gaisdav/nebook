import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {LucideIcon} from 'lucide-react-native';
import {baseSize, size2X} from '../../commonStyles.ts';

interface IconButtonProps {
  Icon: LucideIcon;
  text?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconPosition?: 'left' | 'right';
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  text,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  iconPosition = 'left',
}) => {
  const css = styles({disabled, loading});

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      style={[css.container, style]}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {iconPosition === 'left' && (
            <Icon size={20} color="#fff" style={css.leftIcon} />
          )}

          {text && <Text style={[css.text, textStyle]}>{text}</Text>}

          {iconPosition === 'right' && (
            <Icon size={20} color="#fff" style={css.rightIcon} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = ({
  disabled,
  loading,
  text,
}: Pick<IconButtonProps, 'loading' | 'disabled' | 'text'>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: size2X,
      borderRadius: baseSize,
      backgroundColor: disabled ? '#ccc' : '#007AFF',
      opacity: loading ? 0.7 : 1,
    },

    rightIcon: {marginLeft: text ? 8 : 0},
    leftIcon: {marginRight: text ? 8 : 0},
    text: {color: '#fff', fontSize: 16},
  });
