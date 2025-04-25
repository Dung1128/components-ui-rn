//
//  Created by Dung Nguyen on 25/04/25.
//
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import View from "../View";
import { memoDeepEqual } from "../../utils/function-utils";
import { BUTTON_HEIGHT } from "../../theme/dimensions";
import { useInternalTheme } from "../../core/theming";

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
}: FloatingButtonProps) => {
  const { colors } = useInternalTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading || !onPress}
      onPress={onPress}
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
            borderRadius: size / 2,
            top: top,
            right: right,
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default memoDeepEqual(FloatingButton);
