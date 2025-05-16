import React from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import { SPACE_8 } from "../../theme/dimensions";
import containerStyles from "../../theme/container-styles";
import Icon from "../Icon";
import TextInput from "../TextInput/TextInput";

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
}: SearchInputProps) => {
  return (
    <TextInput
      left={
        <View paddingRight={SPACE_8}>
          <Icon name={"IconSearch"} type="Svg" size={24} />
        </View>
      }
      disabled={disabled}
      value={value}
      clearButton={clearButton}
      mode="default"
      placeholder={placeholder}
      right={rightIcon}
      onFocus={onFocus}
      onBlur={onBlur}
      allowFontScaling={false}
      onChangeText={onChangeText}
      style={[
        {
          height: height || 40,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
});

export default SearchInput;
