//
//  Created by Dung Nguyen on 25/04/25.
//
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import View from "../View";
import { memoDeepEqual } from "../../utils/function-utils";
import ScaleButton from "../ScaleButton";
import { CONSTANTS } from "../../styles/themes/tokens";
import { useInternalTheme } from "../../core/theming";

export interface ButtonIconProps {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: (val?: any) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  hiddenBackground?: boolean;
  props?: object;
  border?: boolean;
  circle?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  mode?: "normal" | "small";
}
const ButtonIcon = ({
  isLoading,
  disabled,
  onPress,
  style,
  hiddenBackground = false,
  border,
  children,
  circle,
  backgroundColor,
  borderColor,
  props,
  mode = "normal",
}: ButtonIconProps) => {
  const { colors } = useInternalTheme();

  const size =
    mode === "small" ? CONSTANTS.BUTTON_HEIGHT_SMALL : CONSTANTS.BUTTON_HEIGHT;

  return (
    <ScaleButton
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
      disabled={disabled || false}
    >
      <View
        style={[
          styles.btn,
          !hiddenBackground
            ? {
                backgroundColor: backgroundColor || colors.surfaceBrandDefault,
              }
            : {
                backgroundColor: "transparent",
              },
          {
            width: size,
            height: size,
          },
          border && {
            borderWidth: CONSTANTS.BORDER_WIDTH_1,
            borderColor: borderColor || colors.borderBrandDefault,
            backgroundColor: backgroundColor || colors.surfacePrimaryDefault,
          },
          circle && {
            borderRadius: size / 2,
          },

          disabled && {
            borderWidth: 0,
            backgroundColor: colors.surfaceBrandDisabled,
          },
          style,
        ]}
        {...props}
      >
        {isLoading ? <ActivityIndicator size={"small"} /> : children}
      </View>
    </ScaleButton>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: CONSTANTS.BORDER_RADIUS_6,
  },
});

export default memoDeepEqual(ButtonIcon);
