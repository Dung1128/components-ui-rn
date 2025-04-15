import React from "react";
import View from "../View";
import {
  DIMENSION_PADDING_MEDIUM,
  DIMENSION_PADDING_NORMAL,
} from "../../theme/dimensions";
import { StyleProp, ViewStyle } from "react-native";
interface SpacerProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Spacer = ({
  style,
  width = DIMENSION_PADDING_MEDIUM,
  height = DIMENSION_PADDING_NORMAL,
}: SpacerProps) => {
  return <View width={width} height={height} style={[style]} />;
};

export default Spacer;
