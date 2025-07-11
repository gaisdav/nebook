import React from 'react';
import {Text, View} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {spacing} from '@/lib/theme';
import {useTheme} from '@/hooks/common/useTheme';

export const ProfileScreen = () => {
  const {profile} = useAuthStore();
  const {colors} = useTheme();

  return (
    <ScreenWrapper scrollable>
      {profile && (
        <View
          style={[
            {flexDirection: 'column', alignItems: 'center', gap: spacing.sm},
          ]}>
          <Text style={[{color: colors.text}]}>{profile.full_name}</Text>
          <Text style={[{color: colors.text}]}>{profile.email}</Text>
        </View>
      )}
    </ScreenWrapper>
  );
};
