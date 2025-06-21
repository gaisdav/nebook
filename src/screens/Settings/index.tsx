import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ScreenWrapper} from '@/components/ScreenWrapper';
import {useTheme} from '@/hooks/useTheme';
import {Card} from '@/components/Card';
import {Button} from '@/components/Button';
import {useAuthStore} from '@/data/auth/store/useAuthStore';
import {useAlert} from '@/hooks/useAlert';
import {useNavigation} from '@/hooks/useNavigation';
import {cache} from '@/lib/cache/CacheService';

export const SettingsScreen = () => {
  const {colors, isDark, toggleTheme, setSystemTheme} = useTheme();
  const {signOut} = useAuthStore();
  const {alert} = useAlert();
  const navigation = useNavigation();

  // Get current theme mode for display
  const getCurrentThemeMode = () => {
    const savedTheme = cache.get<'dark' | 'light' | 'system'>(
      'theme',
      'preference',
    );
    if (savedTheme === 'dark') return 'Dark';
    if (savedTheme === 'light') return 'Light';
    return 'System';
  };

  const handleSignOut = () => {
    alert({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      onConfirm: async () => {
        try {
          await signOut();
          navigation.navigate('Login');
        } catch (error) {
          alert({
            title: 'Error',
            message: 'Failed to sign out. Please try again.',
            confirmText: 'OK',
          });
        }
      },
    });
  };

  const SettingItem = ({
    title,
    subtitle,
    onPress,
    rightComponent,
    isLast,
  }: {
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    isLast?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        {
          borderBottomColor: colors.borderLight,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingItemContent}>
        <View>
          <Text style={[styles.settingTitle, {color: colors.text}]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.settingSubtitle, {color: colors.textSecondary}]}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightComponent}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper scrollable>
      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Appearance
      </Text>

      <Card
        style={[styles.card, {backgroundColor: colors.backgroundSecondary}]}>
        <SettingItem
          title="Dark Mode"
          subtitle={`Current: ${getCurrentThemeMode()}`}
          rightComponent={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: colors.borderLight,
                true: colors.primaryLight,
              }}
              thumbColor={isDark ? colors.primary : colors.border}
            />
          }
        />
        <SettingItem
          title="Use System Theme"
          subtitle="Follow your device's theme setting"
          onPress={setSystemTheme}
          isLast
        />
      </Card>
      {/* 
      <Text style={[styles.sectionTitle, {color: colors.text}]}>Account</Text>

      <Card
        style={[styles.card, {backgroundColor: colors.backgroundSecondary}]}>
        <SettingItem
          title="Profile"
          subtitle="Edit your profile information"
          onPress={() => {
            // Navigate to profile edit screen
          }}
        />
        <SettingItem
          title="Change Password"
          subtitle="Update your account password"
          onPress={() => {
            // Navigate to change password screen
          }}
        />
      </Card>

      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        App Settings
      </Text>

      <Card
        style={[styles.card, {backgroundColor: colors.backgroundSecondary}]}>
        <SettingItem
          title="Notifications"
          subtitle="Manage notification preferences"
          onPress={() => {
            // Navigate to notifications settings
          }}
        />
        <SettingItem
          title="Privacy"
          subtitle="Privacy and data settings"
          onPress={() => {
            // Navigate to privacy settings
          }}
        />
      </Card>

      <Text style={[styles.sectionTitle, {color: colors.text}]}>Support</Text>

      <Card
        style={[styles.card, {backgroundColor: colors.backgroundSecondary}]}>
        <SettingItem
          title="Help & FAQ"
          subtitle="Get help and find answers"
          onPress={() => {
            // Navigate to help screen
          }}
        />
        <SettingItem
          title="Contact Support"
          subtitle="Reach out to our support team"
          onPress={() => {
            // Navigate to contact support
          }}
        />
      </Card> */}

      <View style={styles.logoutSection}>
        <Button
          variant="secondary"
          style={[styles.logoutButton, {borderColor: colors.error}]}
          onPress={handleSignOut}>
          <Text style={[styles.logoutText, {color: colors.error}]}>
            Sign Out
          </Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  logoutButton: {
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
