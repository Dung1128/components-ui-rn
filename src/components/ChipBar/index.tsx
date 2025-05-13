import React, { useState, useCallback, useEffect } from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import { CONSTANTS } from "../../styles/themes/tokens";
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
  isActive?: boolean;
}

const ChipBar = ({
  style,
  borderRadius = CONSTANTS.BORDER_RADIUS_ROUNDED,
  title = "content",
  textStyle,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  badge = 0,
  isActive = false,
}: ChipBarProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;
  const [active, setActive] = useState<boolean>(isActive);

  const handlePressChipBar = useCallback(() => {
    setActive(!active);
    onPress?.();
  }, [active]);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <View row>
      <View
        row
        disabled={disabled}
        paddingHorizontal={CONSTANTS.SPACE_12}
        paddingVertical={CONSTANTS.SPACE_8}
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
          active ? colors.borderBrandDefault : colors.borderPrimaryDefault
        }
        backgroundColor={
          active
            ? colors.surfaceBrandInverseDefault
            : colors.backgroundSecondary
        }
      >
        {leftIcon && <View paddingRight={CONSTANTS.SPACE_4}>{leftIcon}</View>}
        <View>
          <Text
            color={active ? colors.textBrandDefault : colors.textDefault}
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
        {rightIcon && <View paddingLeft={CONSTANTS.SPACE_4}>{rightIcon}</View>}
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
