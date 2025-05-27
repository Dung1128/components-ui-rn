//
//  Created by Dung Nguyen on 08/01/25.
//
import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  ActivityIndicator,
  TextStyle,
} from "react-native";

import ScaleButton from "../ScaleButton";
import Text, { IText } from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";
import { CONSTANTS } from "../../styles/themes/tokens";

export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  border?: boolean;
  borderColor?: string;
  title?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  margin?: Number;
  textProps?: IText;
  textColor?: string;
  bold?: boolean;
  size?: number;
  textStyle?: TextStyle;
  medium?: boolean;
  mode?: "outlined" | "contained" | "transparent";
  transparent?: boolean;
  onPress?: (res?: any) => void;
  full?: boolean;
  theme?: ThemeProp;
  buttonSize?: "normal" | "small";
  critical?: boolean;
}
const Button = ({
  style,
  title,
  border,
  borderColor,
  isLoading,
  left,
  right,
  margin,
  textStyle,
  textProps,
  onPress,
  disabled,
  backgroundColor,
  textColor,
  bold = true,
  size = 16,
  medium = false,
  mode = "contained",
  transparent = false,
  full = false,
  theme: themeOverrides,
  buttonSize = "normal",
  critical = false,
  ...props
}: ButtonProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const disabledTextStyle = {
    color: colors.textDisabled,
  };

  const renderButtonStyle = () => {
    switch (mode) {
      case "outlined":
        return [
          styles.border,
          { borderColor: colors.borderBrandDefault },
          critical && {
            backgroundColor: colors.surfacePrimaryDefault,
            borderColor: colors.borderCriticalDefault,
            borderWidth: CONSTANTS.BORDER_WIDTH_1,
          },
        ];
      case "contained":
        return [
          {
            backgroundColor: critical
              ? colors.surfaceCriticalDefault
              : colors.surfaceBrandDefault,
          },
        ];
      case "transparent":
        return [
          { borderColor: colors.borderBrandDefault },
          { backgroundColor: "transparent" },
        ];
    }
  };

  const renderTextColor = () => {
    switch (mode) {
      case "outlined":
        if (critical) {
          return colors.textCriticalDefault;
        }
        return colors.textBrandDefault;
      case "contained":
        return colors.textOnFillDefault;
      case "transparent":
        if (critical) {
          return colors.textCriticalDefault;
        }
        return colors.textBrandDefault;
    }
  };

  return (
    <View row={!full}>
      <ScaleButton
        activeOpacity={0.8}
        onPress={onPress}
        {...props}
        disabled={disabled || false}
      >
        <View
          style={[
            styles.button,
            {
              borderRadius: CONSTANTS.BORDER_RADIUS_6,
            },
            {
              backgroundColor: colors.surfaceBrandDefault,
            },
            borderColor && { borderColor: borderColor },
            backgroundColor && { backgroundColor: backgroundColor },
            renderButtonStyle(),
            buttonSize === "small" && styles.small,

            disabled && [
              styles.disabled,
              {
                borderColor: colors.borderPrimaryDisabled,
                backgroundColor: colors.surfacePrimaryDisabled,
              },
            ],
            isLoading && { justifyContent: "center" },
            style,
          ]}
          disabled={isLoading}
        >
          <Spacer width={left ? CONSTANTS.SPACE_12 : CONSTANTS.SPACE_16} />
          {!isLoading && left}
          {left && <Spacer width={CONSTANTS.SPACE_8} />}
          {isLoading ? (
            <ActivityIndicator color={textStyle?.color || renderTextColor()} />
          ) : (
            <Text
              numberOfLines={1}
              color={textColor || renderTextColor()}
              size={size}
              bold={bold}
              medium={medium}
              style={[disabled && disabledTextStyle, textStyle]}
              {...textProps}
            >
              {title}
            </Text>
          )}
          {right && <Spacer width={CONSTANTS.SPACE_8} />}
          {!isLoading && right}
          <Spacer width={right ? CONSTANTS.SPACE_12 : CONSTANTS.SPACE_16} />
        </View>
      </ScaleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: { opacity: 0.6 },
  button: {
    height: CONSTANTS.BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: CONSTANTS.DEVICE_WIDTH / 4.5,
  },
  border: {
    borderWidth: CONSTANTS.BORDER_WIDTH_1,
    backgroundColor: "transparent",
  },
  small: {
    height: CONSTANTS.BUTTON_HEIGHT_SMALL,
  },
});

export default React.memo(Button);
