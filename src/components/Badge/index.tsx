import React, { useMemo } from "react";
import View from "../View";
import Text from "../Text";
import { CONSTANTS } from "../../styles/themes/tokens";
import { useInternalTheme } from "../../core/theming";
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from "react-native";
import containerStyles from "@/theme/container-styles";

export type BadgeType = "success" | "error" | "info" | "warning" | "default";
export type BadgeSize = "large" | "medium" | "small";
export type BadgeMode = "default" | "outline";
export type ProgressType = "full" | "half" | "empty" | "none";

interface BadgeProps {
  value?: string;
  borderColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  type?: BadgeType;
  badgeSize?: BadgeSize;
  mode?: BadgeMode;
  textSize?: number;
  progressType?: ProgressType;
  leftIcon?: React.ReactNode;
}

const BADGE_CONFIGS = {
  sizes: {
    medium: {
      paddingHorizontal: CONSTANTS.SPACE_4,
      minWidth: 16,
      minHeight: 16,
      textSize: 10,
    },
    large: {
      paddingHorizontal: CONSTANTS.SPACE_8,
      minWidth: 16,
      minHeight: 24,
      textSize: 12,
    },
  },
  small: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
} as const;

const ProgressCircle: React.FC<{ progress: ProgressType; color: string }> = ({
  progress,
  color,
}) => {
  const size = 8;

  if (progress === "empty") {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: CONSTANTS.BORDER_WIDTH_1,
          borderColor: color,
          backgroundColor: "transparent",
        }}
      />
    );
  }

  if (progress === "half") {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: CONSTANTS.BORDER_WIDTH_1,
          borderColor: color,
          backgroundColor: "transparent",
          overflow: "hidden",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            width: size,
            height: size / 2,
            backgroundColor: color,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
};

const Badge = React.memo<BadgeProps>(
  ({
    value = "1",
    style,
    textColor,
    textStyle,
    type = "default",
    badgeSize = "large",
    mode = "default",
    textSize,
    borderColor,
    backgroundColor,
    progressType = "none",
    leftIcon,
  }) => {
    const theme = useInternalTheme();
    const { colors } = theme;

    const sizeStyles = useMemo(() => {
      if (badgeSize === "small") return null;
      return BADGE_CONFIGS.sizes[badgeSize];
    }, [badgeSize]);

    const getColorProgress = useMemo(() => {
      const configs = {
        success: {
          color: colors.borderSuccessDefault,
        },
        error: {
          color: colors.borderErrorDefault,
        },
        info: {
          color: colors.iconPrimaryDefault,
        },
        warning: {
          color: colors.borderWarningDefault,
        },
        default: {
          color: colors.borderInfoDefault,
        },
      };

      return configs[type];
    }, [colors, type]);

    const typeStyles = useMemo(() => {
      const configs = {
        success: {
          default: {
            borderWidth: 0,
            borderColor: borderColor || colors.borderSuccessDefault,
            backgroundColor: backgroundColor || colors.surfaceSuccessDefault,
          },
          outline: {
            borderColor: borderColor || colors.borderSuccessDefault,
            backgroundColor:
              backgroundColor || colors.surfaceSuccessInverseDefault,
          },
        },
        error: {
          default: {
            borderWidth: 0,
            borderColor: borderColor || colors.borderErrorDefault,
            backgroundColor: backgroundColor || colors.surfaceCriticalDefault,
          },
          outline: {
            borderColor: borderColor || colors.borderErrorDefault,
            backgroundColor:
              backgroundColor || colors.surfaceCriticalInverseDefault,
          },
        },
        info: {
          default: {
            borderWidth: 0,
            borderColor: borderColor || colors.borderPrimaryDefault,
            backgroundColor:
              backgroundColor || colors.surfacePrimaryInverseDefault,
          },
          outline: {
            borderColor: borderColor || colors.borderPrimaryDefault,
            backgroundColor: backgroundColor || colors.surfaceSecondaryDefault,
          },
        },
        warning: {
          default: {
            borderWidth: 0,
            borderColor: borderColor || colors.borderWarningDefault,
            backgroundColor: backgroundColor || colors.surfaceWarningDefault,
          },
          outline: {
            borderColor: borderColor || colors.borderWarningDefault,
            backgroundColor:
              backgroundColor || colors.surfaceWarningInverseDefault,
          },
        },
        default: {
          default: {
            borderWidth: 0,
            borderColor: borderColor || colors.borderInfoDefault,
            backgroundColor: backgroundColor || colors.surfaceInfoDefault,
          },
          outline: {
            borderColor: borderColor || colors.borderInfoDefault,
            backgroundColor:
              backgroundColor || colors.surfaceInfoInverseDefault,
          },
        },
      };

      return configs[type][mode];
    }, [colors, type, mode, borderColor, backgroundColor]);

    const textColorStyle = useMemo(() => {
      const textConfigs = {
        success: {
          default: colors.textOnFillDefault,
          outline: colors.textSuccessDefault,
        },
        error: {
          default: colors.textOnFillDefault,
          outline: colors.textCriticalDefault,
        },
        info: {
          default: colors.textOnFillDefault,
          outline: colors.textDefault,
        },
        warning: {
          default: colors.textOnFillDefault,
          outline: colors.textWarningDefault,
        },
        default: {
          default: colors.textOnFillDefault,
          outline: colors.textInfoDefault,
        },
      };

      return textConfigs[type][mode];
    }, [colors, type, mode]);

    const finalTextSize = useMemo(() => {
      if (badgeSize === "small") return 0;
      return textSize || BADGE_CONFIGS.sizes[badgeSize]?.textSize || 12;
    }, [textSize, badgeSize]);

    if (badgeSize === "small") {
      return (
        <View row style={style}>
          <ProgressCircle
            progress={progressType}
            color={typeStyles.backgroundColor}
          />
        </View>
      );
    }

    return (
      <View row>
        <View
          row
          center
          borderRadius={999}
          borderWidth={CONSTANTS.BORDER_WIDTH_1}
          style={[sizeStyles, typeStyles, style]}
        >
          {leftIcon && <View paddingRight={CONSTANTS.SPACE_4}>{leftIcon}</View>}
          {progressType !== "none" && (
            <ProgressCircle
              progress={progressType}
              color={getColorProgress.color}
            />
          )}
          <View paddingLeft={progressType !== "none" ? CONSTANTS.SPACE_4 : 0}>
            <Text
              size={finalTextSize}
              color={textColor || textColorStyle}
              style={[styles.textMedium, textStyle]}
            >
              {value}
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

Badge.displayName = "Badge";

const styles = StyleSheet.create({
  ...containerStyles,
});

export default Badge;
