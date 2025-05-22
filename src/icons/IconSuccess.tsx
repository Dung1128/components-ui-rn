import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const IconSuccess = (props: SvgProps) => (
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
      d="M8.875 10.9242L12.8447 6.9545L13.9053 8.01516L8.875 13.0455L6.09467 10.2652L7.15533 9.2045L8.875 10.9242Z"
      fill="white"
    />
  </Svg>
);

export default IconSuccess;
