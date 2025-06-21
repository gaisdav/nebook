import React from 'react';
import {Text, View} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {spacing} from '@/lib/theme';
import {useTheme} from '@/hooks/common/useTheme';

export const ProfileScreen = () => {
  const {user} = useAuthStore();
  const {colors} = useTheme();

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
    </ScreenWrapper>
  );
};
