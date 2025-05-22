import { Platform } from "react-native";

import type { InternalTheme } from "../../types";

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
  value?: boolean;
};

const getCheckedColor = ({
  theme,
  color,
}: {
  theme: InternalTheme;
  color?: string;
}) => {
  if (color) {
    return color;
  }

  return theme.colors.toggleBackgroundActive;
};

const getThumbTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === "ios";

  if (isIOS) {
    return undefined;
  }

  if (disabled) {
    if (theme.dark) {
      return theme.colors.toggleBackgroundDefault;
    }
    return theme.colors.toggleBackgroundDefault;
  }

  if (value) {
    return checkedColor;
  }

  if (theme.dark) {
    return theme.colors.toggleBackgroundDefault;
  }
  return theme.colors.toggleBackgroundDefault;
};

const getOnTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === "ios";

  if (isIOS) {
    return checkedColor;
  }

  if (disabled) {
    if (theme.dark) {
      return theme.colors.toggleBackgroundDefault;
    }
    return theme.colors.toggleBackgroundDefault;
  }

  if (value) {
    return checkedColor;
  }

  if (theme.dark) {
    return theme.colors.toggleBackgroundDefault;
  }
  return theme.colors.toggleBackgroundDefault;
};

export const getSwitchColor = ({
  theme,
  disabled,
  value,
  color,
}: BaseProps & { color?: string }) => {
  const checkedColor = getCheckedColor({ theme, color });

  return {
    onTintColor: getOnTintColor({ theme, disabled, value, checkedColor }),
    thumbTintColor: getThumbTintColor({ theme, disabled, value, checkedColor }),
    checkedColor,
  };
};
