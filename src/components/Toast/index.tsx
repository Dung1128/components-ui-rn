/* eslint-disable react-hooks/exhaustive-deps */

import { CONSTANTS } from "../../styles/themes/tokens";
import React, { useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Image as RNImage } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../Text";
import View from "../View";

import { memoWithRef } from "@/utils/function-utils";
import ViewVisibleAnimated from "../ViewVisibleAnimated";
import { useInternalTheme } from "../../core/theming";
import Icon from "../Icon";

const POSITION = {
  TOP: "top",
  BOTTOM: "bottom",
} as const;

const SPACER = {
  NORMAL: "normal",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

type Position = (typeof POSITION)[keyof typeof POSITION];
type ToastType = "success" | "error" | "info" | "warning";
type SpacerType = (typeof SPACER)[keyof typeof SPACER] | number;

interface Notification {
  message?: string;
  duration?: number;
  position?: Position;
  type?: ToastType;
  title: string;
  onPress?: () => void;
  spacer?: SpacerType;
}

interface ToastOptions {
  position: Position;
  type: ToastType;
  title: string;
  onPress?: () => void;
  spacer?: "normal" | "medium" | "large" | number;
}

interface ToastRef {
  show: (options: Notification) => void;
}

interface ViewVisibleAnimatedRef {
  show: (callback?: () => void, duration?: number) => void;
  hide: (callback?: () => void, duration?: number) => void;
}

const Toast = memoWithRef(
  (_props: Record<string, never>, ref: React.ForwardedRef<ToastRef>) => {
    const [message, setMessage] = useState<string>("Thông báo");
    const viewVisibleAnimatedRef = useRef<ViewVisibleAnimatedRef>(null);
    const { bottom, top } = useSafeAreaInsets();
    const [options, setOptions] = useState<ToastOptions>({
      position: POSITION.BOTTOM,
      type: "success",
      title: "Thông báo",
      spacer: "normal",
    });

    const theme = useInternalTheme();
    const { colors } = theme;

    const TIME_OUT = useRef<NodeJS.Timeout | null>(null);

    const show = ({
      message,
      duration = 1000,
      position = POSITION.BOTTOM,
      type = "success",
      onPress,
      title = "Thông báo",
      spacer = "normal",
    }: Notification) => {
      if (!TIME_OUT.current) {
        handleShow({
          message,
          position,
          type,
          onPress,
          title,
          duration,
          spacer,
        });
        return;
      }

      clearTimeout(TIME_OUT.current);
      hide(() => {
        handleShow({
          message,
          position,
          type,
          onPress,
          title,
          duration,
          spacer,
        });
      }, true);
    };

    useImperativeHandle(
      ref,
      () => ({
        show,
      }),
      []
    );

    const handleShow = ({
      message,
      position = POSITION.TOP,
      type = "success",
      onPress,
      title = "Thông báo",
      duration = 1000,
      spacer = "normal",
    }: Notification) => {
      setMessage(message || "");
      setOptions({ position, type, onPress, title, spacer });

      viewVisibleAnimatedRef.current?.show?.(() => {
        TIME_OUT.current = setTimeout(() => {
          hide(() => {}, false);
        }, duration);
      }, 100);
    };

    const hide = (callback: () => void, skipSetMessage: boolean) => {
      viewVisibleAnimatedRef.current?.hide?.(() => {
        if (!skipSetMessage) {
          setMessage("Thông báo");
        }
        callback?.();
      }, 300);
    };

    const onPressToast = () => {
      hide(() => {}, false);
      options?.onPress?.();
    };

    const getBackgroundColor = () => {
      switch (options.type) {
        case "success":
          return colors.surfaceSuccessDefault;
        case "error":
          return colors.surfaceErrorDefault;
        case "info":
          return colors.surfacePrimaryInverseDefault;
        case "warning":
          return colors.surfaceWarningDefault;
        default:
          return colors.surfaceSuccessDefault;
      }
    };

    const getSourceIcon = () => {
      switch (options.type) {
        case "success":
          return "IconSuccess";
        case "error":
          return "IconError";
        case "info":
          return "IconInfo";
        case "warning":
          return "IconWarning";
        default:
          return "IconSuccess";
      }
    };

    const handleToastBottomHeight = () => {
      const { spacer } = options;

      if (typeof spacer === "number") {
        return Math.max(0, spacer);
      }

      switch (spacer) {
        case SPACER.NORMAL:
          return 0;
        case SPACER.MEDIUM:
          return 72;
        case SPACER.LARGE:
          return 104;
        default:
          return 0;
      }
    };

    return (
      <ViewVisibleAnimated
        ref={viewVisibleAnimatedRef}
        autoShow={false}
        scaleEnable
        style={[
          styles.container,
          options.position === POSITION.BOTTOM && {
            bottom: bottom
              ? bottom + handleToastBottomHeight()
              : CONSTANTS.SPACE_16 + handleToastBottomHeight(),
          },
          options.position === POSITION.TOP && {
            top: top ? top : CONSTANTS.SPACE_16,
          },
        ]}
      >
        <View
          row={!options.title}
          center={!options.title}
          full
          activeOpacity={0.8}
          onPress={onPressToast}
          style={[
            styles.wrapContent,
            {
              shadowColor: "black",
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              backgroundColor: getBackgroundColor(),
            },
          ]}
        >
          <View row style={{ alignItems: "flex-start" }}>
            <View>
              <Icon name={getSourceIcon()} type="Svg" size={20} />
            </View>
            <View full paddingLeft={CONSTANTS.SPACE_8}>
              <Text bold color={colors.textOnFillDefault}>
                {options.title}
              </Text>
              {message.toString().length > 0 && (
                <Text
                  color={colors.textOnFillDefault}
                  numberOfLines={4}
                  style={!options.title && styles.wrapMess}
                >
                  {message}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ViewVisibleAnimated>
    );
  }
);

export default Toast;

const styles = StyleSheet.create({
  wrapMess: { marginLeft: CONSTANTS.SPACE_8, flex: 1 },
  wrapContent: {
    borderRadius: CONSTANTS.BORDER_RADIUS_12,
    padding: CONSTANTS.SPACE_12,
    width: CONSTANTS.DEVICE_WIDTH - CONSTANTS.SPACE_16 * 2,
    marginHorizontal: CONSTANTS.SPACE_16,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    width: CONSTANTS.DEVICE_WIDTH,
  },
  img: {
    width: 20,
    height: 20,
  },
});
