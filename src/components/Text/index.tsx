import React from "react";
import { Text as TextRN, TextProps, StyleSheet, Platform } from "react-native";
import { memoDeepEqual } from "../../utils/function-utils";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";

export interface IText extends TextProps {
  size?: number;
  lineHeight?: number;
  color?: string;
  center?: boolean;
  bold?: boolean;
  medium?: boolean;
  children?: any;
  theme?: ThemeProp;
}

const Text = (props: IText) => {
  const { children, onPress, theme: themeOverrides, ...rest } = props;
  const theme = useInternalTheme();
  const { colors } = theme;
  delete rest.style;
  const _getStyle = () => {
    const style: any = {
      fontWeight: "normal",
      color: colors.textDefault,
      fontFamily: "Inter-Regular",
      fontSize: 14,
      lineHeight: 20,
    };
    const { size = 14, lineHeight, center, color, bold, medium } = props;
    style.color = theme.colors.textDefault || "black";
    if (size) {
      style.fontSize = size;
    }
    if (lineHeight) {
      style.lineHeight = lineHeight;
    }
    if (color) {
      style.color = color;
    }
    if (center) {
      style.textAlign = "center";
    }
    if (bold) {
      style.fontFamily = "Inter-Bold";
      if (Platform.OS === "ios") {
        style.fontWeight = "bold";
      }
    }
    if (medium) {
      style.fontFamily = "Inter-SemiBold";
      if (Platform.OS === "ios") {
        style.fontWeight = "600";
      }
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
