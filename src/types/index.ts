import { ColorValue, TextStyle, ViewStyle } from 'react-native';

export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
  };
  fonts: {
    regular: TextStyle;
    medium: TextStyle;
    light: TextStyle;
    thin: TextStyle;
  };
  animation: {
    scale: number;
  };
}

export interface ComponentProps {
  style?: ViewStyle;
  theme?: Theme;
}

export interface TextProps extends ComponentProps {
  color?: ColorValue;
  size?: number;
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export interface ButtonProps extends ComponentProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'text' | 'outlined' | 'contained';
  color?: string;
  dark?: boolean;
  compact?: boolean;
  contentStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export interface CardProps extends ComponentProps {
  onPress?: () => void;
  elevation?: number;
}

export interface TextInputProps extends ComponentProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  disabled?: boolean;
  error?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  label?: string;
} 