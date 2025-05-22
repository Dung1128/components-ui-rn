import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const IconInfo = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM3.86364 10C3.86364 6.61098 6.61098 3.86364 10 3.86364C13.389 3.86364 16.1364 6.61098 16.1364 10C16.1364 13.389 13.389 16.1364 10 16.1364C6.61098 16.1364 3.86364 13.389 3.86364 10Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 6.66667C10.4602 6.66667 10.8333 7.03976 10.8333 7.5V10.8333C10.8333 11.2936 10.4602 11.6667 10 11.6667C9.53976 11.6667 9.16667 11.2936 9.16667 10.8333V7.5C9.16667 7.03976 9.53976 6.66667 10 6.66667Z"
      fill="white"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 12.5C10.4602 12.5 10.8333 12.8731 10.8333 13.3333C10.8333 13.7936 10.4602 14.1667 10 14.1667C9.53976 14.1667 9.16667 13.7936 9.16667 13.3333C9.16667 12.8731 9.53976 12.5 10 12.5Z"
      fill="white"
    />
  </Svg>
);

export default IconInfo;
