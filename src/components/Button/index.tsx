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
} from "@/theme/dimensions";
import ScaleButton from "../ScaleButton";
import Text from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";

export interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  title?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  small?: boolean;
  textColor?: string;
  bold?: boolean;
  size?: number;
  textStyle?: TextStyle;
  medium?: boolean;
  mode?: "outlined" | "contained" | "transparent";
  onPress?: (res?: any) => void;
  theme?: ThemeProp;
}
const Button = ({
  style,
  title,
  borderColor,
  isLoading,
  left,
  right,
  small,
  textStyle,
  onPress,
  disabled,
  backgroundColor,
  textColor,
  bold = true,
  size = 16,
  medium = false,
  mode = "contained",
  theme: themeOverrides,
  ...props
}: ButtonProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const disabledTextStyle = {
    color: colors.textBrandDisabled,
  };

  const renderButtonStyle = () => {
    switch (mode) {
      case "outlined":
        return [styles.border, { borderColor: colors.borderBrandDefault }];
      case "contained":
        return [{ backgroundColor: colors.surfaceBrandDefault }];
      case "transparent":
        return [
          { borderColor: colors.borderBrandDefault },
          { backgroundColor: "transparent" },
        ];
    }
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
            borderColor && { borderColor: borderColor },
            backgroundColor && { backgroundColor: backgroundColor },
            renderButtonStyle(),
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
              color={textStyle?.color || colors.borderBrandDefault}
            />
          ) : (
            <Text
              numberOfLines={1}
              color={textColor || colors.textOnFillDefault}
              size={size}
              bold={bold}
              medium={medium}
              style={[disabled && disabledTextStyle, textStyle]}
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
