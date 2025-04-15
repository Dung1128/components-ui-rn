import * as React from "react";
import { I18nManager, StyleProp, StyleSheet, TextStyle } from "react-native";

import color from "color";

import Text from "./Text";
import type { ThemeProp } from "../../types";
import { useInternalTheme } from "../../core/theming";

type Props = React.ComponentProps<typeof Text> & {
  alpha?: number;
  family: "regular" | "medium" | "light" | "thin";
  style?: StyleProp<TextStyle>;
  theme?: ThemeProp;
};

const StyledText = ({
  alpha = 1,
  family,
  style,
  theme: themeOverrides,
  ...rest
}: Props) => {
  const theme = useInternalTheme(themeOverrides);

  const textColor = color(theme.colors.onSurface).alpha(alpha).rgb().string();
  const writingDirection = I18nManager.getConstants().isRTL ? "rtl" : "ltr";

  return (
    <Text
      {...rest}
      style={[
        styles.text,
        {
          color: textColor,
          writingDirection,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export default StyledText;
