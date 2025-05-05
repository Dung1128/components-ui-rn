import React, { useState, useCallback } from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import {
  BORDER_RADIUS_ROUNDED,
  SPACE_12,
  SPACE_8,
  SPACE_4,
} from "../../theme/dimensions";
import Text from "../Text";
import { useInternalTheme } from "../../core/theming";
import containerStyles from "../../theme/container-styles";
import CountingDot from "../CountingDot";

interface ChipBarProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  borderRadius?: number;
  onPress?: (val?: any) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: number;
}

const ChipBar = ({
  style,
  borderRadius = BORDER_RADIUS_ROUNDED,
  title = "content",
  textStyle,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  badge = 0,
}: ChipBarProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;
  const [isActive, setActive] = useState<boolean>(false);

  const handlePressChipBar = useCallback(() => {
    setActive(!isActive);
    onPress?.();
  }, [isActive]);

  return (
    <View row>
      <View
        row
        disabled={disabled}
        paddingHorizontal={SPACE_12}
        paddingVertical={SPACE_8}
        borderRadius={borderRadius}
        borderWidth={1}
        alignCenter
        style={[
          style,
          disabled && {
            backgroundColor: colors.surfaceSecondaryDefault,
            borderColor: colors.surfaceSecondaryDefault,
          },
        ]}
        onPress={handlePressChipBar}
        borderColor={
          isActive ? colors.borderBrandDefault : colors.borderPrimaryDefault
        }
        backgroundColor={
          isActive
            ? colors.surfaceBrandInverseDefault
            : colors.backgroundSecondary
        }
      >
        {leftIcon && <View paddingRight={SPACE_4}>{leftIcon}</View>}
        <View>
          <Text
            color={isActive ? colors.textBrandDefault : colors.textDefault}
            style={[
              styles.text14,
              styles.textMedium,
              disabled && {
                color: colors.textSecondary,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
        {rightIcon && <View paddingLeft={SPACE_4}>{rightIcon}</View>}
      </View>
      {badge > 0 && (
        <View style={styles.badgeContainer}>
          <CountingDot value={badge} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
  badgeContainer: {
    position: "absolute",
    right: 0,
    top: -4,
    zIndex: 999,
  },
});

export default ChipBar;
