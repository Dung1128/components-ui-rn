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

import {
  BUTTON_HEIGHT,
  BUTTON_HEIGHT_SMALL,
  DIMENSION_PADDING_MEDIUM,
  DIMENSION_PADDING_NORMAL,
} from "@/theme/dimensions";
import ScaleButton from "../ScaleButton";
import Text, { IText } from "../Text";
import View from "../View";
import colors from "../../theme/colors";
import { lightenColor } from "../../utils/function-utils";
import { useInternalTheme } from "@/core/theming";
import { ThemeProp } from "@/types";

export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  border?: boolean;
  title?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  left?: any;
  right?: any;
  small?: boolean;
  margin?: Number;
  textProps?: IText;
  textColor?: string;
  bold?: boolean;
  size?: number;
  textStyle?: TextStyle;
  medium?: boolean;
  onPress?: (res?: any) => void;
  theme?: ThemeProp;
}
const Button = ({
  children,
  style,
  title,
  border,
  isLoading,
  left,
  right,
  small,
  margin,
  textStyle,
  textProps,
  onPress,
  disabled,
  backgroundColor = colors.blue.BLUE100,
  textColor = colors.white.WHITE100,
  bold = true,
  size = 16,
  medium = false,
  ...props
}: ButtonProps) => {
  const theme = useInternalTheme();
  const { roundness } = theme;

  return (
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
            borderRadius: roundness,
          },
          {
            backgroundColor: disabled
              ? lightenColor(backgroundColor, 0)
              : backgroundColor,
          },
          border && styles.border,
          small && styles.small,
          margin && { margin: DIMENSION_PADDING_NORMAL },
          disabled && styles.disabled,
          isLoading && { justifyContent: "center" },
          style,
        ]}
        disabled={isLoading}
      >
        {!isLoading && left}
        {isLoading ? (
          <ActivityIndicator
            color={
              textStyle?.color || textProps?.color || colors.white.WHITE100
            }
          />
        ) : (
          <Text
            numberOfLines={1}
            white={!border}
            primary={border}
            color={textColor}
            size={size}
            bold={bold}
            medium={medium}
            style={textStyle}
            {...textProps}
          >
            {title}
          </Text>
        )}
        {!isLoading && right}
      </View>
    </ScaleButton>
  );
};

const styles = StyleSheet.create({
  disabled: { opacity: 0.6 },
  button: {
    height: BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: DIMENSION_PADDING_MEDIUM,
  },
  border: {
    borderColor: colors.blue.BLUE100,
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  small: {
    paddingHorizontal: DIMENSION_PADDING_MEDIUM * 1.5,
    height: BUTTON_HEIGHT_SMALL,
  },
});

export default React.memo(Button);
