export { ThemeColors } from "./styles/themes/tokens";

export {
  useTheme,
  ThemeProvider,
  DefaultTheme,
  adaptNavigationTheme,
} from "./core/theming";
export * from "./styles/themes";

export { default as shadow } from "./styles/shadow";
export { default as overlay } from "./styles/overlay";
export { default as configureFonts } from "./styles/fonts";
export { default as ActivityIndicator } from "./components/ActivityIndicator";
export { default as ProgressBar } from "./components/ProgressBar";
export { default as Switch } from "./components/Switch/Switch";
export { default as TextInput } from "./components/TextInput/TextInput";
export { default as Button } from "./components/Button";
export { default as ButtonIcon } from "./components/ButtonIcon";
export { default as FloatingButton } from "./components/FloatingButton";
export { default as Text } from "./components/Text";
export { default as View } from "./components/View";
export { default as Spacer } from "./components/Spacer";
export { default as Image } from "./components/Image";
export { default as Badge } from "./components/Badge";
export { default as CountingDot } from "./components/CountingDot";
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
