import React from "react";

interface ToastRef {
  show: (params: {
    message?: string;
    duration?: number;
    position?: "top" | "bottom";
    type?: "success" | "info" | "warning" | "error";
    onPress?: () => void;
    title: string;
    spacer?: "normal" | "medium" | "large" | number;
  }) => void;
}

export const toastRef = React.createRef<ToastRef>();

export const showToast = ({
  message,
  duration = 5000,
  position = "bottom",
  type = "success",
  onPress = () => {},
  title,
  spacer = "normal",
}: {
  message?: string;
  duration?: number;
  position?: "top" | "bottom";
  type?: "success" | "info" | "warning" | "error";
  onPress?: () => void;
  title: string;
  spacer?: "normal" | "medium" | "large" | number;
}) => {
  if (!toastRef.current) {
    console.warn(
      "Toast component is not mounted. Make sure to add <ToastProvider> to your app."
    );
    return;
  }

  toastRef.current.show({
    message,
    duration,
    position,
    type,
    onPress,
    title,
    spacer,
  });
};
