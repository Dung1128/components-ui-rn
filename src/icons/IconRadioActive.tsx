import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconRadioActive = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={9.25} stroke="currentColor" strokeWidth={1.5} />
    <Circle cx={12} cy={12} r={6} fill="currentColor" />
  </Svg>
);

export default IconRadioActive;
