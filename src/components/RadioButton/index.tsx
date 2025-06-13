import React, { useState, useCallback, useMemo, useEffect } from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import { CONSTANTS } from "../../styles/themes/tokens";
import Text from "../Text";
import { useInternalTheme } from "../../core/theming";
import containerStyles from "../../theme/container-styles";
import Icon from "../Icon";

interface RadioButtonProps {
  style?: StyleProp<ViewStyle>;
  content: string;
  onPress?: (value: boolean) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  checked?: boolean;
}

const RadioButton = ({
  style,
  content = "content",
  textStyle,
  onPress,
  disabled = false,
  leftIcon,
  checked = false,
}: RadioButtonProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const handlePress = useCallback(() => {
    onPress?.(!checked);
  }, [checked]);

  const getColorCheckbox = useMemo(() => {
    if (disabled) {
      return colors.iconPrimaryDisabled;
    }
    if (checked) {
      return colors.iconBrandDefault;
    }
    return colors.surfacePrimaryDefault;
  }, [checked, disabled]);

  return (
    <View
      row
      disabled={disabled}
      alignCenter
      style={[style]}
      onPress={handlePress}
    >
      {leftIcon ? (
        <View paddingRight={CONSTANTS.SPACE_8}>{leftIcon}</View>
      ) : (
        <View paddingRight={CONSTANTS.SPACE_8}>
          <Icon
            name={
              disabled
                ? "IconRadioDisable"
                : checked
                ? "IconRadioActive"
                : "IconRadio"
            }
            type="Svg"
            size={24}
            color={getColorCheckbox}
          />
        </View>
      )}

      <View>
        <Text
          color={colors.textDefault}
          style={[
            styles.text14,
            disabled && {
              color: colors.textSecondary,
            },
            textStyle,
          ]}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
  icon: {
    width: 24,
    height: 24,
  },
});

export default RadioButton;
