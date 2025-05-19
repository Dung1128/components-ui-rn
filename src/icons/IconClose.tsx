import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconClose = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M19 6.40958L13.4102 12.0004L19 17.5902L17.5898 19.0004L12 13.4096L6.41016 19.0004L5 17.5902L10.5898 12.0004L5 6.40958L6.41016 5.0004L12 10.5902L17.5898 5.0004L19 6.40958Z"
      fill="currentColor"
    />
  </Svg>
);

export default IconClose;
