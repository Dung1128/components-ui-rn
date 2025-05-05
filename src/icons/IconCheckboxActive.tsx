import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconCheckboxActive = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect x={2} y={2} width={20} height={20} rx={6} fill="currentColor" />
    <Path
      d="M17.7745 8.32544L10.4245 15.6751L6.74951 12.0004"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default IconCheckboxActive;
