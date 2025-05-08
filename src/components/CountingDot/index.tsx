import React from "react";
import View from "../View";
import Text from "../Text";
import { BORDER_RADIUS_12, SPACE_2, SPACE_4 } from "../../theme/dimensions";
import { useInternalTheme } from "../../core/theming";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import containerStyles from "../../theme/container-styles";

interface CountingDotProps {
  children?: React.ReactNode;
  value: string | number;
  borderColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const CountingDot = ({
  children,
  value = "1",
  backgroundColor,
  style,
  textColor,
  textStyle,
}: CountingDotProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  if (children) {
    return <View style={style}>{children}</View>;
  }
  return (
    <View row>
      <View
        center
        borderRadius={BORDER_RADIUS_12}
        backgroundColor={backgroundColor || colors.surfaceCriticalDefault}
        paddingHorizontal={SPACE_4}
        paddingVertical={SPACE_2}
        style={[styles.container, style]}
      >
        <Text
          size={10}
          style={[styles.textMedium, textStyle]}
          color={textColor || colors.textOnFillDefault}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
  container: {
    minWidth: 16,
    minHeight: 16,
  },
});

export default CountingDot;
