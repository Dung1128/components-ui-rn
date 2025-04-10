import type { ComponentType } from "react";

import { $DeepPartial, createTheming } from "@callstack/react-theme-provider";
import color from "color";

import { DarkTheme, LightTheme } from "../styles/themes";
import type {
  InternalTheme,
  AppTheme,
  MD3AndroidColors,
  NavigationTheme,
} from "../types";

export const DefaultTheme = LightTheme;

export const {
  ThemeProvider,
  withTheme,
  useTheme: useAppTheme,
} = createTheming<unknown>(LightTheme);

export function useTheme<T = AppTheme>(overrides?: $DeepPartial<T>) {
  return useAppTheme<T>(overrides);
}

export const useInternalTheme = (
  themeOverrides: $DeepPartial<InternalTheme> | undefined
) => useAppTheme<InternalTheme>(themeOverrides);

export const withInternalTheme = <Props extends { theme: InternalTheme }, C>(
  WrappedComponent: ComponentType<Props & { theme: InternalTheme }> & C
) => withTheme<Props, C>(WrappedComponent);

export const defaultThemesByVersion = {
  2: {
    light: LightTheme,
    dark: DarkTheme,
  },
  3: {
    light: LightTheme,
    dark: DarkTheme,
  },
};

export const getTheme = <
  Scheme extends boolean = false,
  IsVersion3 extends boolean = true
>(
  isDark: Scheme = false as Scheme
): (typeof defaultThemesByVersion)[IsVersion3 extends true
  ? 3
  : 2][Scheme extends true ? "dark" : "light"] => {
  const themeVersion = 3;
  const scheme = isDark ? "dark" : "light";

  return defaultThemesByVersion[themeVersion][scheme];
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
        primary: AppTheme.colors.primary,
        background: AppTheme.colors.background,
        card: AppTheme.colors.elevation.level2,
        text: AppTheme.colors.onSurface,
        border: AppTheme.colors.outline,
        notification: AppTheme.colors.error,
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

export const getDynamicThemeElevations = (scheme: MD3AndroidColors) => {
  const elevationValues = ["transparent", 0.05, 0.08, 0.11, 0.12, 0.14];
  return elevationValues.reduce((elevations, elevationValue, index) => {
    return {
      ...elevations,
      [`level${index}`]:
        index === 0
          ? elevationValue
          : color(scheme.surface)
              .mix(color(scheme.primary), elevationValue as number)
              .rgb()
              .string(),
    };
  }, {});
};
