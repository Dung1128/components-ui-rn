import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useInternalTheme } from "../../core/theming";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useAnimatedReaction,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useCallback, memo } from "react";
import View from "../View";

export type Props = {
  /**
   * Disable toggling the switch.
   */
  disabled?: boolean;
  /**
   * Value of the switch, true means 'on', false means 'off'.
   */
  value?: boolean;

  /**
   * Callback called with the new value when it changes.
   */
  onValueChange?: (value: boolean) => void;
};

const Switch = memo(({ value, disabled, onValueChange }: Props) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const progress = useSharedValue(value ? 1 : 0);

  const handleSwitch = useCallback(() => {
    if (disabled) return;
    const newValue = !value;

    progress.value = withSequence(
      withTiming(newValue ? 1 : 0, {
        duration: 150,
      }),
      withSpring(newValue ? 1 : 0, {
        damping: 20,
        stiffness: 200,
        mass: 0.5,
        velocity: 0.5,
      })
    );

    onValueChange?.(newValue);
  }, [disabled, value, onValueChange]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value * 20 }],
    };
  });

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.toggleBackgroundDefault, colors.toggleBackgroundActive]
      ),
    };
  });

  useAnimatedReaction(
    () => value,
    (currentValue) => {
      if (currentValue !== undefined) {
        progress.value = withSequence(
          withTiming(currentValue ? 1 : 0, {
            duration: 150,
          }),
          withSpring(currentValue ? 1 : 0, {
            damping: 20,
            stiffness: 200,
            mass: 0.5,
            velocity: 0.5,
          })
        );
      }
    },
    [value]
  );

  return (
    <View row>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleSwitch}
        disabled={disabled}
        style={disabled ? { opacity: 0.6 } : {}}
      >
        <Animated.View
          style={[
            styles.vSegment,
            backgroundColor,

            {
              width: 52,
              height: 32,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.animated,
              animatedStyle,
              {
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.surfacePrimaryDefault,
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  vSegment: {
    overflow: "hidden",
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  animated: {
    position: "absolute",
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.15,
    // shadowRadius: BORDER_RADIUS_6,
    // elevation: 5,
    marginHorizontal: 2,
  },
});

Switch.displayName = "Switch";

export default Switch;
