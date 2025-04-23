import React from "react";
import View from "../View";
import { SPACE_16, SPACE_12 } from "../../theme/dimensions";
import { StyleProp, ViewStyle } from "react-native";
interface SpacerProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Spacer = ({
  style,
  width = SPACE_16,
  height = SPACE_12,
}: SpacerProps) => {
  return <View width={width} height={height} style={[style]} />;
};

export default Spacer;
