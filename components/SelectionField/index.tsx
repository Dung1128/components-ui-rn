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

import { CONSTANTS } from "../../styles/themes/tokens";
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
}
const SelectionField = ({
  style,
  content = "content",
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
  ...props
}: SelectionFieldProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const disabledTextStyle = {
    color: colors.textSecondary,
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
              borderRadius: CONSTANTS.BORDER_RADIUS_6,
            },

            [styles.border, { borderColor: colors.borderBrandDefault }],
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
          <Spacer width={CONSTANTS.SPACE_12} />

          <View full>
            {label.toString() !== "" && (
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
              </Text>
            )}
            <Text
              numberOfLines={1}
              color={textColor || colors.textDefault}
              size={size}
              style={[disabled && disabledTextStyle, textStyle]}
              {...textProps}
            >
              {content}
            </Text>
          </View>

          {right || <Icon name={"IconArrowDown"} type="Svg" size={24} />}
          <Spacer width={CONSTANTS.SPACE_12} />
        </View>
      </ScaleButton>
      {error.length > 0 && (
        <View
          paddingHorizontal={CONSTANTS.SPACE_12}
          paddingVertical={CONSTANTS.SPACE_4}
        >
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
    minHeight: CONSTANTS.BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: CONSTANTS.SPACE_6,
  },
  border: {
    borderWidth: CONSTANTS.BORDER_WIDTH_1,
  },
  small: {
    height: CONSTANTS.BUTTON_HEIGHT_SMALL,
  },
});

export default React.memo(SelectionField);
