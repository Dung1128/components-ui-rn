import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const IconWarning = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.5L17.5 17.5H2.5L10 2.5ZM10 5.83333L4.16667 15.8333H15.8333L10 5.83333Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 7.5C10.4602 7.5 10.8333 7.8731 10.8333 8.33333V11.6667C10.8333 12.1269 10.4602 12.5 10 12.5C9.53976 12.5 9.16667 12.1269 9.16667 11.6667V8.33333C9.16667 7.8731 9.53976 7.5 10 7.5Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 13.3333C10.4602 13.3333 10.8333 13.7064 10.8333 14.1667C10.8333 14.6269 10.4602 15 10 15C9.53976 15 9.16667 14.6269 9.16667 14.1667C9.16667 13.7064 9.53976 13.3333 10 13.3333Z"
      fill="white"
    />
  </Svg>
);

export default IconWarning;
