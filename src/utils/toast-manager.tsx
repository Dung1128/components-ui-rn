import React from "react";

interface ToastRef {
  show: (params: {
    message: string;
    duration?: number;
    position?: "top" | "bottom";
    type?: "success" | "fail";
    onPress?: () => void;
    title?: string;
  }) => void;
}

export const toastRef = React.createRef<ToastRef>();

export const showToast = ({
  message,
  duration = 5000,
  position = "top",
  type = "success",
  onPress = () => {},
  title,
}: {
  message: string;
  duration?: number;
  position?: "top" | "bottom";
  type?: "success" | "fail";
  onPress?: () => void;
  title?: string;
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
  });
};
