import React, {useState} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {useNavigation} from '@/hooks/useNavigation';
import {Button} from '@/components/Button';
import {spacing} from '@/lib/theme';
import {useAlert} from '@/hooks/useAlert';
import {useTheme} from '@/hooks/useTheme';

export const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {signOut, user} = useAuthStore();
  const {alert} = useAlert();
  const {colors} = useTheme();

  const handleSignOut = async () => {
    alert({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await signOut();
          // Navigate to Home screen and reset the navigation stack
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } catch (error) {
          Alert.alert('Error', 'Failed to sign out. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <ScreenWrapper scrollable>
      {user && (
        <View
          style={[
            {flexDirection: 'column', alignItems: 'center', gap: spacing.sm},
          ]}>
          <Text style={[{color: colors.text}]}>{user.email}</Text>
          <Text style={[{color: colors.text}]}>
            {user.user_metadata.full_name}
          </Text>
        </View>
      )}

      <Button
        style={[{marginTop: spacing.md}]}
        onPress={handleSignOut}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={colors.textInverse} />
        ) : (
          <Text style={[{color: colors.textInverse}]}>Sign Out</Text>
        )}
      </Button>
    </ScreenWrapper>
  );
};
