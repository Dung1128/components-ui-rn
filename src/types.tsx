import type * as React from "react";

import type { $DeepPartial } from "@callstack/react-theme-provider";

export type Font = {
  fontFamily: string;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fontStyle?: "normal" | "italic" | undefined;
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

type Mode = "adaptive" | "exact";

export type ThemeColors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  gray: string;
  backgroundLight: string;
  backgroundPrimary: string;
  backgroundSecondary: string;

  borderBrandDefault: string;
  borderCriticalDefault: string;
  borderCriticalHover: string;
  borderCriticalPressed: string;
  borderCriticalInverseDefault: string;
  borderCriticalInverseHover: string;
  borderCriticalInversePressed: string;
  borderErrorDefault: string;
  borderErrorInverseDefault: string;
  borderInfoDefault: string;
  borderPrimaryDefault: string;
  borderPrimaryDisabled: string;
  borderPrimaryHovered: string;
  borderPrimaryInverseDefault: string;
  borderPrimaryPressed: string;
  borderPrimaryFocused: string;
  borderSuccessDefault: string;
  borderSuccessInverseDefault: string;
  borderWarningDefault: string;
  borderWarningInverseDefault: string;

  iconBrandDefault: string;
  iconCriticalDefault: string;
  iconErrorDefault: string;
  iconInfoDefault: string;
  iconPrimaryDefault: string;
  iconPrimaryHover: string;
  iconPrimaryDisabled: string;
  iconPrimaryInverseDefault: string;
  iconPrimaryInverseHover: string;
  iconPrimaryInversePressed: string;
  iconPrimaryPressed: string;
  iconSuccessDefault: string;
  iconWarningDefault: string;

  surfaceBrandDefault: string;
  surfaceBrandDisabled: string;
  surfaceBrandHover: string;
  surfaceBrandInverseDefault: string;
  surfaceBrandInverseHover: string;
  surfaceBrandInversePressed: string;
  surfaceBrandPressed: string;

  surfaceCriticalDefault: string;
  surfaceCriticalDisabled: string;
  surfaceCriticalHover: string;
  surfaceCriticalInverseDefault: string;
  surfaceCriticalInverseHover: string;
  surfaceCriticalInversePressed: string;
  surfaceCriticalPressed: string;

  surfaceErrorDefault: string;
  surfaceErrorDisabled: string;
  surfaceErrorHover: string;
  surfaceErrorInverseDefault: string;
  surfaceErrorInverseHover: string;
  surfaceErrorInversePressed: string;
  surfaceErrorPressed: string;

  surfaceInfoDefault: string;
  surfaceInfoDisabled: string;
  surfaceInfoHover: string;
  surfaceInfoInverseDefault: string;
  surfaceInfoInverseHover: string;
  surfaceInfoInversePressed: string;
  surfaceInfoPressed: string;

  surfacePrimaryDefault: string;
  surfacePrimaryDisabled: string;
  surfacePrimaryHover: string;
  surfacePrimaryInverseDefault: string;
  surfacePrimaryInverseHover: string;
  surfacePrimaryInversePressed: string;
  surfacePrimaryPressed: string;

  surfaceSecondaryDefault: string;
  surfaceSecondaryDisabled: string;
  surfaceSecondaryHover: string;
  surfaceSecondaryPressed: string;

  surfaceSuccessDefault: string;
  surfaceSuccessDisabled: string;
  surfaceSuccessHover: string;
  surfaceSuccessInverseDefault: string;
  surfaceSuccessInverseHover: string;
  surfaceSuccessInversePressed: string;
  surfaceSuccessPressed: string;

  surfaceWarningDefault: string;
  surfaceWarningDisabled: string;
  surfaceWarningHover: string;
  surfaceWarningInverseDefault: string;
  surfaceWarningInverseHover: string;
  surfaceWarningInversePressed: string;
  surfaceWarningPressed: string;

  textDefault: string;
  textDisabled: string;
  textPlaceholder: string;
  textSecondary: string;
  textBrandDefault: string;
  textBrandDisabled: string;
  textBrandHovered: string;
  textBrandPressed: string;
  textCriticalDefault: string;
  textCriticalDisabled: string;
  textCriticalHovered: string;
  textCriticalPressed: string;
  textErrorDefault: string;
  textErrorDisabled: string;
  textErrorHovered: string;
  textErrorPressed: string;
  textInfoDefault: string;
  textInfoDisabled: string;
  textInfoHovered: string;
  textInfoPressed: string;
  textLinkDefault: string;
  textLinkDisabled: string;
  textLinkHovered: string;
  textLinkPressed: string;
  textLinkVisitedDefault: string;
  textLinkVisitedDisabled: string;
  textLinkVisitedHovered: string;
  textLinkVisitedPressed: string;
  textOnFillDefault: string;
  textOnFillDisabled: string;
  textOnFillHovered: string;
  textOnFillPressed: string;
  textSuccessDefault: string;
  textSuccessDisabled: string;
  textSuccessHovered: string;
  textSuccessPressed: string;
  textWarningDefault: string;
  textWarningDisabled: string;
  textWarningHovered: string;
  textWarningPressed: string;

  selectBackgroundDisabled: string;
  selectIconDisabled: string;

  toggleBackgroundDefault: string;
  toggleBackgroundActive: string;

  overlayPrimaryDefault: string;
};

export type ThemeProp = $DeepPartial<InternalTheme>;

export type ThemeBase = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  animation: {
    scale: number;
    defaultAnimationDuration?: number;
  };
};

export type AppTheme = ThemeBase & {
  version: 3;
  colors: ThemeColors;
  fonts: MD3Typescale;
};

export type InternalTheme = AppTheme;

// MD3 types
export enum MD3TypescaleKey {
  displayLarge = "displayLarge",
  displayMedium = "displayMedium",
  displaySmall = "displaySmall",

  headlineLarge = "headlineLarge",
  headlineMedium = "headlineMedium",
  headlineSmall = "headlineSmall",

  titleLarge = "titleLarge",
  titleMedium = "titleMedium",
  titleSmall = "titleSmall",

  labelLarge = "labelLarge",
  labelMedium = "labelMedium",
  labelSmall = "labelSmall",

  bodyLarge = "bodyLarge",
  bodyMedium = "bodyMedium",
  bodySmall = "bodySmall",
}

export type MD3Type = {
  fontFamily: string;
  letterSpacing: number;
  fontWeight: Font["fontWeight"];
  lineHeight: number;
  fontSize: number;
  fontStyle?: Font["fontStyle"];
};

export type MD3Typescale =
  | {
      [key in MD3TypescaleKey]: MD3Type;
    } & {
      ["default"]: Omit<MD3Type, "lineHeight" | "fontSize">;
    };

export type MD3Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export enum ElevationLevels {
  "level0",
  "level1",
  "level2",
  "level3",
  "level4",
  "level5",
}

export type MD3ElevationColors = {
  [key in keyof typeof ElevationLevels]: string;
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  "children"
>;

export type EllipsizeProp = "head" | "middle" | "tail" | "clip";

export type NavigationTheme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};
