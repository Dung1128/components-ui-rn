import React, { useState, useCallback, useEffect } from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import { CONSTANTS } from "../../styles/themes/tokens";
import Text from "../Text";
import { useInternalTheme } from "../../core/theming";
import containerStyles from "../../theme/container-styles";
import Icon from "../Icon";

interface TagProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  borderRadius?: number;
  onPress?: (value: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  checked?: boolean;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  numberOfLines?: number;
  hideRightIcon?: boolean;
  height?: number;
}

const Tag = ({
  style,
  borderRadius = CONSTANTS.BORDER_RADIUS_ROUNDED,
  title = "content",
  textStyle,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  checked = false,
  ellipsizeMode = "tail",
  numberOfLines = 1,
  hideRightIcon = false,
  height = 32,
}: TagProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const handlePressTag = useCallback(() => {
    onPress?.(!checked);
  }, [checked]);

  return (
    <View row>
      <View
        row
        height={height}
        disabled={disabled}
        paddingHorizontal={CONSTANTS.SPACE_12}
        paddingVertical={CONSTANTS.SPACE_8}
        borderRadius={borderRadius}
        center
        style={[
          disabled && {
            backgroundColor: colors.surfaceSecondaryDefault,
            borderColor: colors.surfaceSecondaryDefault,
          },
          style,
        ]}
        onPress={handlePressTag}
        backgroundColor={
          checked
            ? colors.surfaceBrandInversePressed
            : colors.surfaceBrandInverseDefault
        }
      >
        {leftIcon && <View paddingRight={CONSTANTS.SPACE_4}>{leftIcon}</View>}
        <View>
          <Text
            size={14}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            style={[
              styles.textMedium,
              {
                lineHeight: 16,
              },
              disabled && {
                color: colors.textSecondary,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
        {rightIcon ? (
          <View paddingLeft={CONSTANTS.SPACE_4}>{rightIcon}</View>
        ) : hideRightIcon ? (
          <View />
        ) : (
          <View paddingLeft={CONSTANTS.SPACE_4}>
            <Icon
              name={"IconClose"}
              type="Svg"
              size={20}
              color={colors.iconBrandDefault}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
});

export default Tag;
