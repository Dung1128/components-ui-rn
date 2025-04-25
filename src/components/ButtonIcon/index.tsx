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
import {
  BORDER_RADIUS_6,
  BORDER_WIDTH_1,
  BUTTON_HEIGHT,
} from "../../theme/dimensions";
import { useInternalTheme } from "../../core/theming";

export interface ButtonIconProps {
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: (val?: any) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  size?: number;
  hiddenBackground?: boolean;
  props?: object;
  border?: boolean;
  circle?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}
const ButtonIcon = ({
  isLoading,
  disabled,
  onPress,
  style,
  hiddenBackground = false,
  size = BUTTON_HEIGHT,
  border,
  children,
  circle,
  backgroundColor,
  borderColor,
  props,
}: ButtonIconProps) => {
  const { colors } = useInternalTheme();
  const Component = TouchableOpacity;
  return (
    <Component
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
          },
          border && {
            borderWidth: BORDER_WIDTH_1,
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
    </Component>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS_6,
  },
});

export default memoDeepEqual(ButtonIcon);
