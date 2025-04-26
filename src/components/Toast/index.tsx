/* eslint-disable react-hooks/exhaustive-deps */

import {
  DEVICE_WIDTH,
  SPACE_16,
  SPACE_8,
  SPACE_12,
} from "../../theme/dimensions";
import React, { useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, Image as RNImage } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../Text";
import View from "../View";

import { memoWithRef } from "@/utils/function-utils";
import ViewVisibleAnimated from "../ViewVisibleAnimated";
import { useInternalTheme } from "../../core/theming";

const POSITION = {
  TOP: "top",
  BOTTOM: "bottom",
} as const;

type Position = (typeof POSITION)[keyof typeof POSITION];
type ToastType = "success" | "error" | "info" | "warning";

interface Notification {
  message?: string;
  duration?: number;
  position?: Position;
  type?: ToastType;
  title: string;
  onPress?: () => void;
}

interface ToastOptions {
  position: Position;
  type: ToastType;
  title?: string;
  onPress?: () => void;
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
      position: POSITION.TOP,
      type: "success",
      title: "Thông báo",
    });

    const theme = useInternalTheme();
    const { colors } = theme;

    const TIME_OUT = useRef<NodeJS.Timeout | null>(null);

    const show = ({
      message,
      duration = 1000,
      position = POSITION.TOP,
      type = "success",
      onPress,
      title = "Thông báo",
    }: Notification) => {
      if (!TIME_OUT.current) {
        handleShow({ message, position, type, onPress, title, duration });
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
    }: Notification) => {
      setMessage(message || "");
      setOptions({ position, type, onPress, title });

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
          return require("./assets/images/success.png");
        case "error":
          return require("./assets/images/error.png");
        case "info":
          return require("./assets/images/info.png");
        case "warning":
          return require("./assets/images/warning.png");
        default:
          return require("./assets/images/success.png");
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
            bottom: bottom,
          },
          options.position === POSITION.TOP && {
            top: top,
          },
        ]}
      >
        <View
          row={!options.title}
          center={!options.title}
          full
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
              <RNImage source={getSourceIcon()} style={styles.img} />
            </View>
            <View full paddingLeft={SPACE_8}>
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
  wrapMess: { marginLeft: SPACE_8, flex: 1 },
  wrapContent: {
    borderRadius: 12,
    padding: SPACE_12,
    width: DEVICE_WIDTH - SPACE_16 * 2,
    marginHorizontal: SPACE_16,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    width: DEVICE_WIDTH,
  },
  img: {
    width: 20,
    height: 20,
  },
});
