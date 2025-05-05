import colors from "../../theme/colors";
import React from "react";
import { View } from "react-native";

interface SvgIconProps {
  name: any;
  width?: number;
  height?: number;
  color?: string;
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
}
const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width = 24,
  height = 24,
  color = colors.ink.INK40,
  style,
  onPress,
  disabled = false,
}) => {
  // Kiểm tra kỹ hơn
  if (!name || typeof name !== "function") {
    console.warn(`Icon is not a valid React component:`, name);
    return <View style={{ width, height }} />;
  }

  const IconComponent = name;

  return (
    <IconComponent
      width={width}
      height={height}
      color={disabled ? colors.ink.INK20 : color}
      style={style}
      onPress={disabled ? undefined : onPress}
    />
  );
};

export default SvgIcon;
