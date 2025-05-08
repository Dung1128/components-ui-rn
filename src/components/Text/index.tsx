import React from "react";
import { Text as TextRN, TextProps, StyleSheet } from "react-native";

import { memoDeepEqual } from "../../utils/function-utils";
import colors from "../../theme/colors";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";

export interface IText extends TextProps {
  size?: number;
  color?: string;
  center?: boolean;
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
    const { size = 14, center, color } = props;
    style.color = theme.colors.textDefault || "black";
    if (size) {
      style.fontSize = size;
    }
    if (color) {
      style.color = color;
    }
    if (center) {
      style.textAlign = "center";
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
