import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useNavigation} from '@/hooks/common/useNavigation';
import {useTheme} from '@/hooks/common/useTheme';
import {spacing, typography, borderRadius} from '@/lib/theme';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {Button} from '@/components/Button';
import Toast from 'react-native-toast-message';
import {Input} from '@/components/Input';
import {PasswordInput} from '@/components/Input/PasswordInput';
import {getErrorMessage} from '@/lib/utils';
import {ScreenWrapper} from '@/components/ScreenWrapper';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {signIn, error, setError} = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);

      // Navigate to Home screen and reset the navigation stack
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.signInError || 'Something went wrong',
        onHide: () => {
          setError(null);
        },
      });
    }
  }, [error]);

  return (
    <ScreenWrapper scrollable style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={[styles.title, {color: colors.text}]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
              Sign in to continue
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, {color: colors.text}]}>Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="Enter your email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      editable={!isSubmitting}
                      error={errors.email?.message}
                    />
                  )}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, {color: colors.text}]}>
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  render={({field: {onChange, onBlur, value}}) => (
                    <PasswordInput
                      placeholder="Enter your password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoComplete="password"
                      editable={!isSubmitting}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      error={errors.password?.message}
                    />
                  )}
                />
              </View>

              <Button
                style={[styles.loginButton, {backgroundColor: colors.primary}]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.textInverse} />
                ) : (
                  <Text
                    style={[
                      styles.loginButtonText,
                      {color: colors.textInverse},
                    ]}>
                    Sign In
                  </Text>
                )}
              </Button>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={isSubmitting}>
                <Text
                  style={[styles.registerButtonText, {color: colors.primary}]}>
                  Don't have an account? Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  inputContainer: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  loginButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  loginButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  registerButton: {
    padding: spacing.md,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: typography.fontSize.md,
  },
});
