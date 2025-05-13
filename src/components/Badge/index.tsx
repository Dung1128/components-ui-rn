import React from "react";
import View from "../View";
import Text from "../Text";
import { CONSTANTS } from "../../styles/themes/tokens";
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
        borderRadius={CONSTANTS.BORDER_RADIUS_12}
        borderWidth={CONSTANTS.BORDER_WIDTH_1}
        borderColor={borderColor || colors.borderPrimaryDefault}
        backgroundColor={backgroundColor || colors.surfaceSecondaryDefault}
        paddingHorizontal={CONSTANTS.SPACE_8}
        paddingVertical={CONSTANTS.SPACE_4}
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
