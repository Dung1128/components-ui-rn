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
  SPACE_16,
  SPACE_12,
  BORDER_RADIUS_6,
  BORDER_WIDTH_1,
  SPACE_8,
} from "../../theme/dimensions";
import ScaleButton from "../ScaleButton";
import Text, { IText } from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";

export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  border?: boolean;
  borderColor?: string;
  title?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
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
  style,
  title,
  border,
  borderColor,
  isLoading,
  left,
  right,
  small,
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
  theme: themeOverrides,
  ...props
}: ButtonProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const disabledTextStyle = {
    color: colors.textBrandDisabled,
  };

  return (
    <View style={styles.container}>
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
              borderRadius: BORDER_RADIUS_6,
            },
            {
              backgroundColor: colors.surfaceBrandDefault,
            },
            border && [
              styles.border,
              { borderColor: colors.borderBrandDefault },
            ],
            borderColor && { borderColor: borderColor },
            backgroundColor && { backgroundColor: backgroundColor },
            small && styles.small,
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
          <Spacer width={left ? SPACE_12 : SPACE_16} />
          {!isLoading && left}
          {left && <Spacer width={SPACE_8} />}
          {isLoading ? (
            <ActivityIndicator
              color={textStyle?.color || textProps?.color || colors.onPrimary}
            />
          ) : (
            <Text
              numberOfLines={1}
              white={!border}
              primary={border}
              color={textColor || colors.textOnFillDefault}
              size={size}
              bold={bold}
              medium={medium}
              style={[disabled && disabledTextStyle, textStyle]}
              {...textProps}
            >
              {title}
            </Text>
          )}
          {right && <Spacer width={SPACE_8} />}
          {!isLoading && right}
          <Spacer width={right ? SPACE_12 : SPACE_16} />
        </View>
      </ScaleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  disabled: { opacity: 0.6 },
  button: {
    height: BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    borderWidth: BORDER_WIDTH_1,
    backgroundColor: "transparent",
  },
  small: {
    height: BUTTON_HEIGHT_SMALL,
  },
});

export default React.memo(Button);
