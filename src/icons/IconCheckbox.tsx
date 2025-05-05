import * as React from "react";
import Svg, { Rect } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconCheckbox = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Rect
      x={2.75}
      y={2.75}
      width={18.5}
      height={18.5}
      rx={5.25}
      fill="currentColor"
      stroke="#A1A5AB"
      strokeWidth={1.5}
    />
  </Svg>
);

export default IconCheckbox;
