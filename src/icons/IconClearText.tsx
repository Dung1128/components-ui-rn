import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const IconClearText = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2.00043C17.53 2.00043 22 6.47046 22 12.0004C21.9997 17.5302 17.5298 22.0004 12 22.0004C6.47016 22.0004 2.00026 17.5302 2 12.0004C2.00004 6.47046 6.47003 2.00043 12 2.00043ZM12 10.5903L9.41016 8.00043L8 9.40961L10.5898 12.0004L8 14.5903L9.41016 16.0004L12 13.4096L14.5898 16.0004L16 14.5903L13.4102 12.0004L16 9.40961L14.5898 8.00043L12 10.5903Z"
      fill="currentColor"
    />
  </Svg>
);

export default IconClearText;
