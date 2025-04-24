import React from "react";
import { Text as TextRN, TextProps, StyleSheet, Platform } from "react-native";

import { memoDeepEqual } from "../../utils/function-utils";
import colors from "../../theme/colors";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";

export interface IText extends TextProps {
  size?: number;
  weight?: any;
  gray?: boolean;
  black?: boolean;
  white?: boolean;
  blue?: boolean;
  primary?: boolean;
  bold?: boolean;
  medium?: boolean;
  italic?: boolean;
  color?: string;
  fontFamily?: string;
  useFontConfig?: boolean;
  center?: boolean;
  font?: any;
  lineHeight?: number;
  children?: any;
  theme?: ThemeProp;
}

const Text = (props: IText) => {
  const { children, onPress, theme: themeOverrides, ...rest } = props;
  const theme = useInternalTheme();

  delete rest.style;
  const _getStyle = () => {
    const style: any = {
      fontWeight: "normal",
      color: colors.ink.INK100,
      fontFamily: "Inter-Regular",
    };
    const {
      size = 14,
      weight,
      bold,
      gray,
      white,
      blue,
      primary,
      black,
      medium,
      italic,
      color,
      font,
      fontFamily,
      useFontConfig,
      center,
      lineHeight,
    } = props;
    style.color = theme.colors.text_primary || "black";
    console.log(theme.colors.text_primary);
    if (fontFamily) {
      style.fontFamily = fontFamily;
    }
    if (font && useFontConfig) {
      style.fontFamily = font;
    }
    if (size) {
      style.fontSize = size;
    }
    if (lineHeight) {
      style.lineHeight = lineHeight;
    }
    if (weight) {
      style.fontWeight = weight;
    }
    if (bold && !fontFamily) {
      style.fontFamily = "Inter-Bold";
      if (Platform.OS === "ios") {
        style.fontWeight = "bold";
      }
    }
    if (medium && !fontFamily) {
      style.fontFamily = "Inter-SemiBold";
      if (Platform.OS === "ios") {
        style.fontWeight = "600";
      }
    }
    if (gray) {
      style.color = colors.ink.INK40;
    }
    if (white) {
      style.color = "#fff";
    }
    if (blue) {
      style.color = colors.blue.BLUE100;
    }
    if (primary) {
      style.color = colors.blue.BLUE100;
    }
    if (black) {
      style.color = colors.ink.INK100;
    }
    if (color) {
      style.color = color;
    }
    if (center) {
      style.textAlign = "center";
    }
    if (italic) {
      delete style.fontFamily;
      delete style.fontWeight;
      style.fontStyle = "italic";
    }
    return StyleSheet.create({ style }).style;
  };
  const defaultStyle = _getStyle();
  const Component = TextRN;

  return (
    <Component
      onPress={onPress}
      style={[defaultStyle, props.style]}
      allowFontScaling={false}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default memoDeepEqual(Text);
