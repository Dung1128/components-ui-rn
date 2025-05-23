import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ViewProps {
  row?: boolean;
  full?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
  center?: boolean;
  color?: any;
  backgroundColor?: any;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  onPress?: () => void;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  disabled?: boolean;
  activeOpacity?: number;
  paddingBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  alignEnd?: boolean;
  wrap?: boolean;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  borderTopWidth?: number;
  borderTopColor?: string;
  borderLeftWidth?: number;
  borderLeftColor?: string;
  borderRightWidth?: number;
  borderRightColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}
const ViewCustom = ({
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
  style,
  onPress,
  activeOpacity = 0.8,
  children,
  disabled,
  paddingBottom,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  borderTopWidth,
  borderTopColor,
  borderLeftWidth,
  borderLeftColor,
  borderRightWidth,
  borderRightColor,
}: ViewProps) => {
  const getStyle = () => {
    const styleCustom: any = {};

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
    if (paddingBottom) {
      styleCustom.paddingBottom = paddingBottom;
    }
    if (marginLeft) {
      styleCustom.marginLeft = marginLeft;
    }
    if (marginRight) {
      styleCustom.marginRight = marginRight;
    }
    if (marginTop) {
      styleCustom.marginTop = marginTop;
    }
    if (marginBottom) {
      styleCustom.marginBottom = marginBottom;
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
    if (borderTopWidth) {
      styleCustom.borderTopWidth = borderTopWidth;
    }
    if (borderTopColor) {
      styleCustom.borderTopColor = borderTopColor;
    }
    if (borderLeftWidth) {
      styleCustom.borderLeftWidth = borderLeftWidth;
    }
    if (borderLeftColor) {
      styleCustom.borderLeftColor = borderLeftColor;
    }
    if (borderRightWidth) {
      styleCustom.borderRightWidth = borderRightWidth;
    }
    if (borderRightColor) {
      styleCustom.borderRightColor = borderRightColor;
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

    return StyleSheet.create({ styleCustom }).styleCustom;
  };

  const defaultStyle = getStyle();
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      style={[defaultStyle, style]}
    >
      {children}
    </Component>
  );
};

export default React.memo(ViewCustom);
