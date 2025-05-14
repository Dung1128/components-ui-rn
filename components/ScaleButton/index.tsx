import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const ScaleButton = ({
  children,
  style,
  onPress = () => {},
  ...rest
}: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...rest} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(ScaleButton);
