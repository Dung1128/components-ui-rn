import React from "react";
import View from "../View";
import Text from "../Text";
import {
  BORDER_RADIUS_12,
  BORDER_WIDTH_1,
  SPACE_8,
  SPACE_4,
} from "../../theme/dimensions";
import { useInternalTheme } from "../../core/theming";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
interface BadgeProps {
  children?: React.ReactNode;
  value: string;
  borderColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const Badge = ({
  children,
  value = "1",
  borderColor,
  backgroundColor,
  style,
  textColor,
  textStyle,
}: BadgeProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  if (children) {
    return <View style={style}>{children}</View>;
  }
  return (
    <View row>
      <View
        borderRadius={BORDER_RADIUS_12}
        borderWidth={BORDER_WIDTH_1}
        borderColor={borderColor || colors.borderPrimaryDefault}
        backgroundColor={backgroundColor || colors.surfaceSecondaryDefault}
        paddingHorizontal={SPACE_8}
        paddingVertical={SPACE_4}
        style={style}
      >
        <Text
          size={12}
          color={textColor || colors.textSecondary}
          style={textStyle}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default Badge;
