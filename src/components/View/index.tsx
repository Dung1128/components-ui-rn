import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  row?: boolean;
  full?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  center?: boolean;
  gap?: number;
  color?: any;
  backgroundColor?: any;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  onPress?: () => void;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  useThemeColor?: boolean | "light";
  disabled?: boolean;
  activeOpacity?: number;
  paddingBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  style?: any;
  children?: React.ReactNode;
  alignEnd?: boolean;
  wrap?: boolean;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}
const ViewCustom = (props: Props) => {
  const { children, onPress, activeOpacity = 0.8, style, ...rest } = props;
  const { colors }: any = useTheme();

  const getStyle = () => {
    const styleCustom: any = {};
    const {
      row,
      full,
      justifyCenter,
      justifyBetween,
      alignCenter,
      center,
      color,
      backgroundColor,
      width,
      height,
      padding,
      paddingHorizontal,
      paddingVertical,
      useThemeColor,
      marginHorizontal,
      marginVertical,
      paddingLeft,
      paddingRight,
      paddingTop,
      alignEnd,
      wrap,
      borderBottomWidth,
      borderBottomColor,
      borderRadius,
      borderWidth,
      borderColor,
    } = rest;

    if (row) {
      styleCustom.flexDirection = "row";
    }
    if (full) {
      styleCustom.flex = 1;
    }
    if (justifyCenter) {
      styleCustom.justifyContent = "center";
    }
    if (justifyBetween) {
      styleCustom.justifyContent = "space-between";
    }
    if (alignCenter) {
      styleCustom.alignItems = "center";
    }
    if (center) {
      styleCustom.justifyContent = "center";
      styleCustom.alignItems = "center";
    }
    if (color) {
      styleCustom.color = color;
    }
    if (backgroundColor) {
      styleCustom.backgroundColor = backgroundColor;
    }
    if (width) {
      styleCustom.width = width;
    }
    if (height) {
      styleCustom.height = height;
    }
    if (padding) {
      styleCustom.padding = padding;
    }
    if (paddingHorizontal) {
      styleCustom.paddingHorizontal = paddingHorizontal;
    }
    if (paddingVertical) {
      styleCustom.paddingVertical = paddingVertical;
    }
    if (marginHorizontal) {
      styleCustom.marginHorizontal = marginHorizontal;
    }

    if (marginVertical) {
      styleCustom.marginVertical = marginVertical;
    }

    if (paddingLeft) {
      styleCustom.paddingLeft = paddingLeft;
    }
    if (paddingTop) {
      styleCustom.paddingTop = paddingTop;
    }

    if (paddingRight) {
      styleCustom.paddingRight = paddingRight;
    }
    if (alignEnd) {
      styleCustom.alignItems = "flex-end";
    }
    if (wrap) {
      styleCustom.flexWrap = "wrap";
    }
    if (borderBottomWidth) {
      styleCustom.borderBottomWidth = borderBottomWidth;
    }
    if (borderBottomColor) {
      styleCustom.borderBottomColor = borderBottomColor;
    }
    if (borderRadius) {
      styleCustom.borderRadius = borderRadius;
    }
    if (borderWidth) {
      styleCustom.borderWidth = borderWidth;
    }
    if (borderColor) {
      styleCustom.borderColor = borderColor;
    }

    if (useThemeColor) {
      if (useThemeColor === "light") {
        styleCustom.backgroundColor = colors.backgroundLight || "white";
      } else {
        styleCustom.backgroundColor = colors.background || "white";
      }
    }
    return StyleSheet.create({ styleCustom }).styleCustom;
  };

  const defaultStyle = getStyle();
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[defaultStyle, style]}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default React.memo(ViewCustom);
