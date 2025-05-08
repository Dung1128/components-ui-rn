import React, { useState, useCallback, useMemo } from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import { SPACE_8 } from "../../theme/dimensions";
import Text from "../Text";
import { useInternalTheme } from "../../core/theming";
import containerStyles from "../../theme/container-styles";
import Icon from "../Icon";

interface CheckboxProps {
  style?: StyleProp<ViewStyle>;
  content: string;
  onPress?: (val?: any) => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  checked?: boolean;
  iconSize?: number;
}

const useCheckboxColor = (isActive: boolean, disabled: boolean) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  return useMemo(() => {
    if (disabled) {
      return colors.iconPrimaryDisabled;
    }
    if (isActive) {
      return colors.iconBrandDefault;
    }
    return colors.surfacePrimaryDefault;
  }, [isActive, disabled, colors]);
};

const Checkbox = ({
  style,
  content = "content",
  textStyle,
  onPress,
  disabled = false,
  leftIcon,
  checked = false,
  iconSize = 24,
}: CheckboxProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;
  const [isActive, setActive] = useState<boolean>(checked);
  const checkboxColor = useCheckboxColor(isActive, disabled);

  const handlePressChipBar = useCallback(() => {
    setActive(!isActive);
    onPress?.();
  }, [isActive, onPress]);

  return (
    <View
      row
      disabled={disabled}
      alignCenter
      style={[style]}
      onPress={handlePressChipBar}
    >
      {leftIcon ? (
        <View paddingRight={SPACE_8}>{leftIcon}</View>
      ) : (
        <View paddingRight={SPACE_8}>
          <Icon
            name={isActive ? "IconCheckboxActive" : "IconCheckbox"}
            type="Svg"
            size={iconSize}
            color={checkboxColor}
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

export default Checkbox;
