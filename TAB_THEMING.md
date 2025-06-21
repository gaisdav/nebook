# Tab Theming Guide

This guide explains how to use the new tab theme colors throughout the app.

## Overview

The app now includes comprehensive tab theming support with dedicated colors for both light and dark themes. The tab colors are automatically applied to the bottom tab navigator and can be used in other components that need tab-related styling.

## Available Tab Colors

### Light Theme

- `tabBar`: `#FFFFFF` - Tab bar background
- `tabBarBorder`: `#DDDDDD` - Tab bar top border
- `tabActive`: `#007AFF` - Active tab icon and label color
- `tabInactive`: `#999999` - Inactive tab icon and label color
- `tabLabel`: `#666666` - Default tab label color
- `tabLabelActive`: `#007AFF` - Active tab label color

### Dark Theme

- `tabBar`: `#1C1C1E` - Tab bar background
- `tabBarBorder`: `#38383A` - Tab bar top border
- `tabActive`: `#0A84FF` - Active tab icon and label color
- `tabInactive`: `#8E8E93` - Inactive tab icon and label color
- `tabLabel`: `#EBEBF5` - Default tab label color
- `tabLabelActive`: `#0A84FF` - Active tab label color

## Usage

### 1. Using the `useTabTheme` Hook

The easiest way to access tab colors is using the `useTabTheme` hook:

```tsx
import {useTabTheme} from '@/hooks/useTheme';

function MyComponent() {
  const tabColors = useTabTheme();

  return (
    <View style={{backgroundColor: tabColors.tabBar}}>
      <Text style={{color: tabColors.tabActive}}>
        This text uses tab active color
      </Text>
    </View>
  );
}
```

### 2. Using the `useTheme` Hook

You can also access tab colors through the main `useTheme` hook:

```tsx
import {useTheme} from '@/hooks/useTheme';

function MyComponent() {
  const {colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.tabBar}}>
      <Text style={{color: colors.tabActive}}>
        This text uses tab active color
      </Text>
    </View>
  );
}
```

### 3. Using the Helper Function

For utility functions or non-component code:

```tsx
import {getTabThemeColors} from '@/lib/theme';

function getTabStyles(isDark: boolean) {
  const tabColors = getTabThemeColors(isDark);

  return {
    backgroundColor: tabColors.tabBar,
    borderColor: tabColors.tabBarBorder,
  };
}
```

## Implementation Details

### Tab Navigator Configuration

The main `Tabs` component automatically applies theme colors:

```tsx
<Tab.Navigator
  screenOptions={{
    tabBarStyle: {
      backgroundColor: tabColors.tabBar,
      borderTopColor: tabColors.tabBarBorder,
      borderTopWidth: 1,
    },
    tabBarActiveTintColor: tabColors.tabActive,
    tabBarInactiveTintColor: tabColors.tabInactive,
    tabBarLabelStyle: {
      color: tabColors.tabLabel,
      fontSize: 12,
      fontWeight: '500',
    },
  }}
>
```

### Navigation Container Theming

The `NavigationContainer` in `App.tsx` uses custom themes that integrate with the app's color scheme:

```tsx
const customLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    notification: colors.primary,
  },
};
```

## Best Practices

1. **Use the `useTabTheme` hook** for components that specifically need tab-related colors
2. **Use the main `useTheme` hook** for general theming needs
3. **Keep tab colors consistent** across the app by using the predefined color values
4. **Test both light and dark themes** to ensure proper contrast and readability

## Examples

### Custom Tab Component

```tsx
import {useTabTheme} from '@/hooks/useTheme';

function CustomTab({isActive, icon, label, onPress}) {
  const tabColors = useTabTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: tabColors.tabBar,
        borderColor: isActive ? tabColors.tabActive : tabColors.tabInactive,
      }}>
      <Icon color={isActive ? tabColors.tabActive : tabColors.tabInactive} />
      <Text
        style={{
          color: isActive ? tabColors.tabLabelActive : tabColors.tabLabel,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
```

### Tab-Related UI Elements

```tsx
import {useTabTheme} from '@/hooks/useTheme';

function TabIndicator({isActive}) {
  const tabColors = useTabTheme();

  return (
    <View
      style={{
        backgroundColor: isActive ? tabColors.tabActive : 'transparent',
        borderColor: tabColors.tabBarBorder,
      }}
    />
  );
}
```

## Migration Notes

If you have existing tab-related styling, you can easily migrate by:

1. Replacing hardcoded colors with theme color references
2. Using the `useTabTheme` hook instead of manual color calculations
3. Ensuring your components respond to theme changes automatically

The tab theming system is designed to work seamlessly with the existing theme infrastructure and will automatically adapt to theme changes.
