import { Platform } from 'react-native';
import setColor from 'color';

import type { InternalTheme } from '../../types';

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

  return theme.colors.surfaceBrandDefault;
};

const getThumbTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === 'ios';

  if (isIOS) {
    return undefined;
  }

  if (disabled) {
    if (theme.dark) {
      return theme.colors.backgroundPrimary;
    }
    return theme.colors.backgroundPrimary;;
  }

  if (value) {
    return checkedColor;
  }

  if (theme.dark) {
    return theme.colors.backgroundPrimary;
  }
  return theme.colors.backgroundPrimary;
};

const getOnTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === 'ios';

  if (isIOS) {
    return checkedColor;
  }

  if (disabled) {
    if (theme.dark) {
        return setColor(theme.colors.backgroundPrimary).alpha(0.06).rgb().string();
    }
    return setColor(theme.colors.backgroundPrimary).alpha(0.12).rgb().string();
  }

  if (value) {
    return setColor(checkedColor).alpha(0.5).rgb().string();
  }

  if (theme.dark) {
    return theme.colors.backgroundPrimary;
  }
  return theme.colors.backgroundPrimary;
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
