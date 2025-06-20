import * as React from "react";
import { Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { ThemeProp } from "../../../types";

type UnderlineProps = {
  parentState: {
    focused: boolean;
  };
  error?: boolean;
  colors?: {
    error?: string;
  };
  activeColor: string;
  underlineColorCustom?: string;
  hasActiveOutline?: boolean;
  style?: StyleProp<ViewStyle>;
  theme?: ThemeProp;
};

export const Underline = ({
  parentState,
  error,
  colors,
  activeColor,
  underlineColorCustom,
  hasActiveOutline,
  style,
}: UnderlineProps) => {
  let backgroundColor = parentState.focused
    ? activeColor
    : underlineColorCustom;

  if (error) backgroundColor = colors?.error;

  const activeScale = 2;

  return (
    <Animated.View
      testID="text-input-underline"
      style={[
        styles.underline,
        styles.md3Underline,
        {
          backgroundColor,
          // Underlines is thinner when input is not focused
          transform: [
            {
              scaleY: hasActiveOutline ? activeScale : 0.5,
            },
          ],
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  underline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    zIndex: 1,
  },
  md3Underline: {
    height: 1,
  },
});
