import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  useState,
  ForwardedRef,
} from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";

export type ViewVisibleAnimatedProps = {
  scaleEnable?: boolean;
  translateEnable?: boolean;
  autoHide?: boolean;
  onShowDone?: () => void;
  onDone?: () => void;
  onShowStart?: () => void;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  duration?: number;
  timeout?: number;
  autoShow?: boolean;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto";
  scaleType?: "in" | "out";
  renderHiddenContent?: React.ReactNode;
  children?: React.ReactNode;
  disableHiddenContent?: boolean;
};

const ViewVisibleAnimated = React.memo(
  React.forwardRef(
    (
      {
        onShowStart,
        onShowDone,
        onDone,
        style,
        children,
        autoHide = false,
        scaleEnable = true,
        translateEnable = true,
        delay = 100,
        duration = 250,
        timeout = 1000,
        autoShow = true,
        pointerEvents = "auto",
        scaleType = "in",
        renderHiddenContent = null,
        disableHiddenContent = false,
      }: ViewVisibleAnimatedProps,
      ref: ForwardedRef<{ show: () => void; hide: () => void }>
    ) => {
      useImperativeHandle(ref, () => ({
        hide,
        show,
      }));

      const visibleAnimation = useRef(new Animated.Value(0)).current;
      const translateAnimation = useRef(new Animated.Value(0)).current;
      const scaleAnimation = useRef(
        new Animated.Value(scaleType === "in" ? 0 : 3)
      ).current;

      const [visible, setVisible] = useState(false);
      let TIME_OUT: NodeJS.Timeout | null = null;

      useEffect(() => {
        if (autoShow) {
          TIME_OUT = setTimeout(() => {
            show();
          }, delay);
        }
        return () => {
          if (TIME_OUT) clearTimeout(TIME_OUT);
        };
      }, []);

      const show = (
        callback?: () => void,
        durationShow: number = delay
      ): void => {
        handleShow({ callback, durationShow });
      };

      const handleShow = ({
        callback,
        durationShow,
        position = "top",
      }: {
        callback?: () => void;
        durationShow: number;
        position?: "top" | "bottom";
      }) => {
        if (TIME_OUT) clearTimeout(TIME_OUT);
        TIME_OUT = setTimeout(() => {
          onShowStart?.();
          showAnimation(callback, position);
        }, durationShow);
      };

      const showAnimation = (
        callback?: () => void,
        position: "top" | "bottom" = "bottom"
      ) => {
        setVisible(true);
        translateAnimation.setValue(position === "bottom" ? 100 : -100);

        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(visibleAnimation, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnimation, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ]).start(() => {
          callback?.();
          onShowDone?.();
          if (autoHide) {
            TIME_OUT = setTimeout(() => {
              hide(onDone);
            }, timeout);
          }
        });
      };

      const hide = (
        callback?: () => void,
        durationHide: number = duration
      ): void => {
        handleHide({ callback, durationHide });
      };

      const handleHide = ({
        durationHide,
        callback,
        position = "bottom",
      }: {
        durationHide: number;
        callback?: () => void;
        position?: "top" | "bottom";
      }) => {
        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: scaleType === "in" ? 0 : 3,
            duration: durationHide,
            useNativeDriver: true,
          }),
          Animated.timing(visibleAnimation, {
            toValue: 0,
            duration: durationHide,
            useNativeDriver: true,
          }),
          Animated.timing(translateAnimation, {
            toValue: position === "bottom" ? 300 : -300,
            duration: durationHide,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setVisible(false);
          callback?.();
        });
      };

      return (
        <Animated.View
          style={[
            style,
            {
              opacity: visibleAnimation,
              transform: [
                { scale: scaleEnable ? scaleAnimation : 1 },
                {
                  translateY: translateEnable ? translateAnimation : 0,
                },
              ],
            },
          ]}
          pointerEvents={visible ? pointerEvents : "none"}
        >
          {disableHiddenContent
            ? children
            : visible
            ? children
            : renderHiddenContent}
        </Animated.View>
      );
    }
  )
);

export default ViewVisibleAnimated;
