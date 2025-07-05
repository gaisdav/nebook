import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
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

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterScreen = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {signUp, error, setError} = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        fullName: data.name,
      });

      // Navigation will be handled automatically by the auth state change
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully. Please verify your email.',
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

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.signUpError || 'Something went wrong',
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
              Create Account
            </Text>
            <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
              Sign up to get started
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, {color: colors.text}]}>Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="Enter your name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoComplete="name"
                      editable={!isSubmitting}
                      error={errors.name?.message}
                    />
                  )}
                />
              </View>

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
                      placeholder="Create a password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoComplete="password-new"
                      editable={!isSubmitting}
                      error={errors.password?.message}
                    />
                  )}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, {color: colors.text}]}>
                  Confirm Password
                </Text>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({field: {onChange, onBlur, value}}) => (
                    <PasswordInput
                      placeholder="Confirm your password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoComplete="password-new"
                      editable={!isSubmitting}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      error={errors.confirmPassword?.message}
                    />
                  )}
                />
              </View>

              <Button
                style={[
                  styles.registerButton,
                  {backgroundColor: colors.primary},
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.textInverse} />
                ) : (
                  <Text
                    style={[
                      styles.registerButtonText,
                      {color: colors.textInverse},
                    ]}>
                    Create Account
                  </Text>
                )}
              </Button>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleBackToLogin}
                disabled={isSubmitting}>
                <Text style={[styles.loginButtonText, {color: colors.primary}]}>
                  Already have an account? Sign in
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
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  registerButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  disabledButton: {
    opacity: 0.7,
  },
  registerButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  loginButton: {
    padding: spacing.md,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: typography.fontSize.md,
  },
});
