import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconArrowDown = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18.0107 9.70166L12 15.7124L5.98926 9.70166L7.40332 8.2876L12 12.8843L16.5967 8.2876L18.0107 9.70166Z"
      fill="currentColor"
    />
  </Svg>
);

export default IconArrowDown;
