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
import { BUTTON_HEIGHT } from "../../theme/dimensions";
import { useInternalTheme } from "../../core/theming";
import ScaleButton from "../ScaleButton";

export interface FloatingButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: (val?: any) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  size?: number;
  hiddenBackground?: boolean;
  props?: object;
  backgroundColor?: string;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
}
const FloatingButton = ({
  isLoading,
  disabled,
  onPress,
  style,
  hiddenBackground = false,
  size = BUTTON_HEIGHT,
  children,
  backgroundColor,
  props,
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
}: FloatingButtonProps) => {
  const { colors } = useInternalTheme();
  return (
    <ScaleButton
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
      disabled={disabled || isLoading}
      style={[
        styles.btn,
        top > 0 && { top: top },
        right > 0 && { right: right },
        left > 0 && { left: left },
        bottom > 0 && { bottom: bottom },
      ]}
    >
      <View
        center
        style={[
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
    position: "absolute",
  },
});

export default memoDeepEqual(FloatingButton);
