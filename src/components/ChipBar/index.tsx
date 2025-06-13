import React from "react";
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
  onPress?: (isActive: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: number;
  isActive?: boolean;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  numberOfLines?: number;
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
  ellipsizeMode = "tail",
  numberOfLines = 1,
}: ChipBarProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const handlePressChipBar = () => {
    if (!disabled) {
      onPress?.(!isActive);
    }
  };

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
          disabled && {
            backgroundColor: colors.surfaceSecondaryDefault,
            borderColor: colors.surfaceSecondaryDefault,
          },
          style,
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
        {leftIcon && <View paddingRight={CONSTANTS.SPACE_4}>{leftIcon}</View>}
        <View>
          <Text
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
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
