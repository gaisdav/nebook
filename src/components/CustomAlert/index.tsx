import {useTheme} from '@/hooks/common/useTheme';
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title = 'Attention',
  message = '',
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const {colors} = useTheme();
  const scale = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scale.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, {backgroundColor: colors.overlay}]}>
        <Animated.View
          style={[
            styles.container,
            {transform: [{scale}]},
            {backgroundColor: colors.backgroundSecondary},
          ]}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
          <Text style={[styles.message, {color: colors.text}]}>{message}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={[{color: colors.text}]}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: colors.primary}]}
              onPress={onConfirm}>
              <Text style={[{color: colors.textInverse}]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 12,
    padding: 8,
  },
  confirmButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
