import React from "react";
import View from "../View";
import Text from "../Text";
import { useInternalTheme } from "../../core/theming";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import Image from "../Image";
interface AvatarProps {
  children?: React.ReactNode;
  name?: string;
  borderColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
  size: 64 | 48 | 24;
  source?: string;
  onPress?: () => void;
}

const Avatar = ({
  children,
  name = "Sapo",
  backgroundColor,
  style,
  textColor,
  size = 64,
  source,
  onPress,
}: AvatarProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0];
    }
    return words[0][0] + words[words.length - 1][0];
  };

  if (children) {
    return <View style={style}>{children}</View>;
  }

  const getSize = (size: number) => {
    switch (size) {
      case 64:
        return 28;
      case 48:
        return 20;
      case 24:
        return 16;
      default:
        return 16;
    }
  };

  return (
    <View
      onPress={onPress}
      width={size}
      height={size}
      borderRadius={size / 2}
      center
      backgroundColor={backgroundColor || colors.surfaceSecondaryDefault}
      style={[styles.container, style]}
    >
      {source ? (
        <Image
          useFastImage
          resizeMode="cover"
          source={source}
          style={{ width: size, height: size }}
        />
      ) : (
        <Text
          size={getSize(size)}
          style={{ fontWeight: "500" }}
          color={textColor || colors.textSecondary}
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
export default Avatar;
