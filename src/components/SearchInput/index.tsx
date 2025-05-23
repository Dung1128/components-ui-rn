import React from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import Icon from "../Icon";
import TextInput from "../TextInput/TextInput";
import { useInternalTheme } from "../../core/theming";

interface SearchInputProps {
  style?: StyleProp<ViewStyle>;
  value?: string;
  placeholder?: string;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearButton?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  height?: number;
}

const SearchInput = ({
  value = "",
  disabled = false,
  rightIcon,
  clearButton = false,
  placeholder = "Tìm kiếm",
  onFocus,
  onBlur,
  onChangeText,
  style,
  height,
  textStyle,
}: SearchInputProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;
  return (
    <TextInput
      left={
        <View center>
          <Icon name={"IconSearch"} type="Svg" size={18} />
        </View>
      }
      disabled={disabled}
      value={value}
      clearButton={clearButton}
      mode="default"
      label={placeholder}
      placeholder={placeholder}
      right={rightIcon}
      onFocus={onFocus}
      onBlur={onBlur}
      allowFontScaling={false}
      onChangeText={onChangeText}
      textStyle={textStyle}
      style={[
        {
          height: height || 36,
        },
        style,
      ]}
      contentStyle={[
        {
          backgroundColor: colors.surfaceSecondaryDefault,
          paddingTop: 0,
        },
        style,
      ]}
    />
  );
};

export default SearchInput;
