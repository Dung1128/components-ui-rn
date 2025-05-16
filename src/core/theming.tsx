import type { ComponentType } from "react";
import React from "react";
import { useColorScheme } from "react-native";

import { $DeepPartial, createTheming } from "@callstack/react-theme-provider";

import { DarkTheme, LightTheme } from "../styles/themes";
import type { InternalTheme, AppTheme, NavigationTheme } from "../types";

export const DefaultTheme = LightTheme;

const {
  ThemeProvider: BaseThemeProvider,
  withTheme,
  useTheme: useAppTheme,
} = createTheming<unknown>(LightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : LightTheme;

  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};

export function useTheme<T = AppTheme>(overrides?: $DeepPartial<T>) {
  return useAppTheme<T>(overrides);
}

export const useInternalTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = getTheme(isDark);

  return theme;
};

export const withInternalTheme = <Props extends { theme: InternalTheme }, C>(
  WrappedComponent: ComponentType<Props & { theme: InternalTheme }> & C
) => withTheme<Props, C>(WrappedComponent);

export const defaultThemesByVersion = {
  light: LightTheme,
  dark: DarkTheme,
};

export const getTheme = <Scheme extends boolean = false>(
  isDark: Scheme = false as Scheme
): (typeof defaultThemesByVersion)[Scheme extends true ? "dark" : "light"] => {
  const scheme = isDark ? "dark" : "light";

  return defaultThemesByVersion[scheme];
};

// eslint-disable-next-line no-redeclare
export function adaptNavigationTheme(themes: {
  reactNavigationLight: NavigationTheme;
  materialLight?: AppTheme;
}): {
  LightTheme: NavigationTheme;
};
// eslint-disable-next-line no-redeclare
export function adaptNavigationTheme(themes: {
  reactNavigationDark: NavigationTheme;
  materialDark?: AppTheme;
}): {
  DarkTheme: NavigationTheme;
};
// eslint-disable-next-line no-redeclare
export function adaptNavigationTheme(themes: {
  reactNavigationLight: NavigationTheme;
  reactNavigationDark: NavigationTheme;
  materialLight?: AppTheme;
  materialDark?: AppTheme;
}): { LightTheme: NavigationTheme; DarkTheme: NavigationTheme };
// eslint-disable-next-line no-redeclare
export function adaptNavigationTheme(themes: any) {
  const {
    reactNavigationLight,
    reactNavigationDark,
    materialLight,
    materialDark,
  } = themes;

  const getAdaptedTheme = (
    navigationTheme: NavigationTheme,
    AppTheme: AppTheme
  ) => {
    return {
      ...navigationTheme,
      colors: {
        ...navigationTheme.colors,
        primary: AppTheme.colors.surfaceBrandDefault,
        background: AppTheme.colors.backgroundPrimary,
        card: AppTheme.colors.card,
        text: AppTheme.colors.backgroundPrimary,
        border: AppTheme.colors.borderPrimaryDefault,
        notification: AppTheme.colors.surfaceErrorDefault,
      },
    };
  };

  const AppThemes = {
    light: materialLight || LightTheme,
    dark: materialDark || DarkTheme,
  };

  if (reactNavigationLight && reactNavigationDark) {
    const modes = ["light", "dark"] as const;

    const NavigationThemes = {
      light: reactNavigationLight,
      dark: reactNavigationDark,
    };

    const { light: adaptedLight, dark: adaptedDark } = modes.reduce(
      (prev, curr) => {
        return {
          ...prev,
          [curr]: getAdaptedTheme(NavigationThemes[curr], AppThemes[curr]),
        };
      },
      {
        light: reactNavigationLight,
        dark: reactNavigationDark,
      }
    );

    return {
      LightTheme: adaptedLight,
      DarkTheme: adaptedDark,
    };
  }

  if (reactNavigationDark) {
    return {
      DarkTheme: getAdaptedTheme(reactNavigationDark, AppThemes.dark),
    };
  }

  return {
    LightTheme: getAdaptedTheme(reactNavigationLight, AppThemes.light),
  };
}
