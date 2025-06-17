import React from "react";
import { StyleProp, ViewStyle, StyleSheet, TextStyle } from "react-native";
import View from "../View";
import containerStyles from "../../theme/container-styles";
import Icon from "../Icon";
import TextInput from "../TextInput/TextInput";
import { useInternalTheme } from "../../core/theming";
import { useDebouncedCallback } from "use-debounce";

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
  debounceTime?: number;
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
  debounceTime = 500,
}: SearchInputProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const debouncedOnChangeText = useDebouncedCallback((text: string) => {
    onChangeText?.(text);
  }, debounceTime);

  return (
    <TextInput
      left={
        <View>
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
      onChangeText={debouncedOnChangeText}
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

const styles = StyleSheet.create({
  ...containerStyles,
});

export default SearchInput;
