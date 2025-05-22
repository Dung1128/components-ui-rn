import React from "react";
import View from "../View";
import { CONSTANTS } from "../../styles/themes/tokens";
import { StyleProp, ViewStyle } from "react-native";
interface SpacerProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const Spacer = ({
  style,
  width = CONSTANTS.SPACE_16,
  height = CONSTANTS.SPACE_12,
  backgroundColor,
}: SpacerProps) => {
  return (
    <View
      backgroundColor={backgroundColor || "transparent"}
      width={width}
      height={height}
      style={[style]}
    />
  );
};

export default Spacer;
