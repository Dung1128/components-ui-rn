export { ThemeColors } from "./styles/themes/tokens";

export {
  useTheme,
  withTheme,
  ThemeProvider,
  DefaultTheme,
  adaptNavigationTheme,
} from "./core/theming";
export * from "./styles/themes";

export { default as shadow } from "./styles/shadow";
export { default as overlay } from "./styles/overlay";
export { default as configureFonts } from "./styles/fonts";
export { default as Text, customText } from "./components/Typography/Text";
export { default as ActivityIndicator } from "./components/ActivityIndicator";
export { default as ProgressBar } from "./components/ProgressBar";
export { default as Switch } from "./components/Switch/Switch";
export { default as TextInput } from "./components/TextInput/TextInput";
// Types
export type { Props as ActivityIndicatorProps } from "./components/ActivityIndicator";
export type { Props as SwitchProps } from "./components/Switch/Switch";
export type { Props as TextInputProps } from "./components/TextInput/TextInput";
export type { Props as TextInputAffixProps } from "./components/TextInput/Adornment/TextInputAffix";

export type {
  AppTheme,
  ThemeBase,
  MD3Elevation,
  MD3TypescaleKey,
} from "./types";
