import React, { useMemo } from "react";
import { StyleProp, TextStyle, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useInternalTheme } from "../../core/theming";
import { CONSTANTS } from "../../styles/themes/tokens";
import SvgIcon from "../IconSvg";
import IconCheckboxActive from "../../icons/IconCheckboxActive";
import IconCheckbox from "../../icons/IconCheckbox";
import IconRadio from "../../icons/IconRadio";
import IconRadioActive from "../../icons/IconRadioActive";
import IconRadioDisable from "../../icons/IconRadioDisable";
import IconArrowDown from "../../icons/IconArrowDown";
import IconClearText from "../../icons/IconClearText";
import IconSearch from "@/icons/IconSearch";

export type IconType =
  | "FontAwesome"
  | "Image"
  | "MaterialIcons"
  | "Feather"
  | "MaterialCommunityIcons"
  | "Svg";

export interface IconProps {
  name:
    | "IconCheckboxActive"
    | "IconCheckbox"
    | "IconRadio"
    | "IconRadioActive"
    | "IconRadioDisable"
    | "IconArrowDown"
    | "IconClearText"
    | "IconSearch";
  backgroundColor?: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  showBackground?: boolean;
  onPress?: () => void;
  type?: IconType;
  tintColor?: string;
  animatedProps?: Record<string, unknown>;
}

const getIconComponent = (type: IconType) => {
  switch (type) {
    case "MaterialIcons":
      return MaterialIcons;
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
    case "FontAwesome":
    default:
      return FontAwesome;
  }
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 14,
  color,
  style,
  showBackground,
  backgroundColor,
  onPress,
  type = "FontAwesome",
  tintColor,
  ...rest
}) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const IconComponent = useMemo(() => getIconComponent(type), [type]);

  const renderName = () => {
    switch (name) {
      case "IconCheckboxActive":
        return IconCheckboxActive;
      case "IconCheckbox":
        return IconCheckbox;
      case "IconRadio":
        return IconRadio;
      case "IconRadioActive":
        return IconRadioActive;
      case "IconRadioDisable":
        return IconRadioDisable;
      case "IconArrowDown":
        return IconArrowDown;
      case "IconClearText":
        return IconClearText;
      case "IconSearch":
        return IconSearch;
      default:
        return IconCheckbox;
    }
  };

  const renderIcon = () => {
    if (type === "Svg") {
      return (
        <SvgIcon
          name={renderName()}
          width={size}
          height={size}
          color={color || colors.iconPrimaryDefault}
        />
      );
    }

    return (
      <IconComponent
        name={name as string}
        size={size}
        color={color || colors.iconPrimaryDefault}
        {...rest}
      />
    );
  };

  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: CONSTANTS.BORDER_RADIUS_8,
          },
          style,
        ]}
      >
        {renderIcon()}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Icon);
