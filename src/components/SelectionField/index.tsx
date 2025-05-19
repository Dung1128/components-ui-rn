//
//  Created by Dung Nguyen on 08/01/25.
//
import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
} from "react-native";

import {
  BUTTON_HEIGHT_SMALL,
  SPACE_12,
  BORDER_RADIUS_6,
  BORDER_WIDTH_1,
  SPACE_6,
  SPACE_4,
} from "@/theme/dimensions";
import ScaleButton from "../ScaleButton";
import Text, { IText } from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";
import Icon from "../Icon";
import containerStyles from "../../theme/container-styles";

export interface SelectionFieldProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  content?: string;
  label?: string;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  textProps?: IText;
  textColor?: string;
  labelColor?: string;
  size?: number;
  textStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  onPress?: (res?: any) => void;
  theme?: ThemeProp;
  required?: boolean;
}
const SelectionField = ({
  style,
  content = "",
  label = "",
  error = "",
  borderColor,
  left,
  right,
  textStyle,
  labelStyle,
  textProps,
  onPress,
  disabled = false,
  textColor,
  labelColor,
  size = 16,
  theme: themeOverrides,
  required = false,
  ...props
}: SelectionFieldProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const disabledTextStyle = {
    color: colors.textSecondary,
  };

  const getColor = () => {
    if (disabled) return colors.textPlaceholder;
    if (error.length > 0) return colors.textErrorDefault;
    if (content.toString() === "") {
      return textColor || colors.textSecondary;
    }
    return textColor || colors.textDefault;
  };

  return (
    <View>
      <ScaleButton
        activeOpacity={0.8}
        onPress={onPress}
        {...props}
        disabled={disabled || false}
      >
        <View
          style={[
            styles.container,
            {
              borderRadius: BORDER_RADIUS_6,
            },

            [styles.border, { borderColor: colors.borderPrimaryDefault }],
            borderColor && { borderColor: borderColor },
            disabled && [
              styles.disabled,
              {
                borderColor: colors.borderPrimaryDisabled,
                backgroundColor: colors.surfacePrimaryDisabled,
              },
            ],
            error.length > 0 && [
              {
                borderColor: colors.borderErrorDefault,
                backgroundColor: colors.surfacePrimaryDefault,
              },
            ],
            style,
          ]}
        >
          <Spacer width={SPACE_12} />

          <View full>
            {content.toString() !== "" && label.toString() !== "" && (
              <Text
                color={labelColor || colors.textSecondary}
                style={[
                  styles.text12,
                  disabled && {
                    color: colors.textPlaceholder,
                  },
                  error.length > 0 && {
                    color: colors.textErrorDefault,
                  },
                ]}
              >
                {label}
                {required && <Text color={colors.textErrorDefault}> *</Text>}
              </Text>
            )}
            <Text
              numberOfLines={1}
              color={getColor()}
              size={size}
              style={[disabled && disabledTextStyle, textStyle]}
              {...textProps}
            >
              {content.toString() === "" ? label : content}
              {required && content.toString() === "" && (
                <Text color={colors.textErrorDefault}> *</Text>
              )}
            </Text>
          </View>

          {right || <Icon name={"IconArrowDown"} type="Svg" size={24} />}
          <Spacer width={SPACE_12} />
        </View>
      </ScaleButton>
      {error.length > 0 && (
        <View paddingHorizontal={SPACE_12} paddingVertical={SPACE_4}>
          <Text style={styles.text12} color={colors.textErrorDefault}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
  disabled: { opacity: 0.6 },
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACE_6,
  },
  border: {
    borderWidth: BORDER_WIDTH_1,
  },
  small: {
    height: BUTTON_HEIGHT_SMALL,
  },
});

export default React.memo(SelectionField);
