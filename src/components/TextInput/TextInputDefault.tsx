import * as React from "react";
import {
  TextInput as NativeTextInput,
  StyleSheet,
  I18nManager,
  Platform,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import View from "../View";
import { MAXIMIZED_LABEL_FONT_SIZE } from "./constants";
import { getOutlinedInputColors, getConstants } from "./helpers";
import type { RenderProps, ChildTextInputProps } from "./types";
import { BORDER_RADIUS_6, SPACE_12, SPACE_8 } from "@/theme/dimensions";
import Spacer from "../Spacer";
import Icon from "../Icon";

const TextInputDefault = ({
  disabled = false,
  editable = true,
  label,
  error = false,
  selectionColor: customSelectionColor,
  cursorColor,
  outlineColor: customOutlineColor,
  activeOutlineColor,
  outlineStyle,
  textColor,
  dense,
  style,
  theme,
  render = (props: RenderProps) => <NativeTextInput {...props} />,
  multiline = false,
  parentState,
  innerRef,
  onFocus,
  forceFocus,
  onBlur,
  onChangeText,
  onLayout,
  left,
  right,
  placeholderTextColor,
  clearButton = false,
  contentStyle,
  value,
  ...rest
}: ChildTextInputProps) => {
  const { colors } = theme;
  const font = theme.fonts.bodyLarge;

  const {
    fontSize: fontSizeStyle,
    fontWeight,
    lineHeight: lineHeightStyle,
    height,
    backgroundColor = colors?.backgroundPrimary,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  const lineHeight =
    lineHeightStyle || (Platform.OS === "web" ? fontSize * 1.2 : undefined);

  const { inputTextColor, activeColor, outlineColor, selectionColor } =
    getOutlinedInputColors({
      activeOutlineColor,
      customOutlineColor,
      customSelectionColor,
      textColor,
      disabled,
      error,
      theme,
    });

  const [inputValue, setInputValue] = React.useState(value || "");

  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setInputValue("");
    onChangeText?.("");
  };

  if (height && typeof height !== "number") {
    console.warn("Currently we support only numbers in height prop");
  }

  const placeholderTextColorBasedOnState =
    placeholderTextColor || colors.textSecondary;

  const getBorderColor = () => {
    if (disabled) {
      return theme.colors.surfacePrimaryDisabled;
    } else if (parentState.focused) {
      return activeColor;
    } else {
      return theme.colors.borderPrimaryDefault;
    }
  };

  return (
    <View style={viewStyle}>
      <View
        row
        alignCenter
        style={[
          {
            borderRadius: BORDER_RADIUS_6,
            borderWidth: 1,
            borderColor: getBorderColor(),
            overflow: "hidden",
            backgroundColor: disabled
              ? theme.colors.surfacePrimaryDisabled
              : theme.colors.surfacePrimaryDefault,
          },
        ]}
      >
        {left && <View paddingLeft={SPACE_12}>{left}</View>}
        {left && <Spacer width={SPACE_8} />}
        {render?.({
          ...rest,
          ref: innerRef,
          onChangeText: handleChangeText,
          value: inputValue,
          placeholder: rest.placeholder,
          editable: !disabled && editable,
          selectionColor,
          cursorColor:
            typeof cursorColor === "undefined" ? activeColor : cursorColor,
          placeholderTextColor: placeholderTextColorBasedOnState,
          onFocus,
          onBlur,
          underlineColorAndroid: "transparent",
          multiline,
          style: [
            styles.input,
            {
              ...font,
              fontSize,
              lineHeight,
              fontWeight,
              color: inputTextColor,
              textAlignVertical: multiline ? "top" : "center",
              textAlign: textAlign
                ? textAlign
                : I18nManager.getConstants().isRTL
                ? "right"
                : "left",
            },
            contentStyle,
          ],
        } as RenderProps)}
        {!disabled && clearButton && inputValue ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name={"IconClearText"} type="Svg" size={24} />
          </TouchableOpacity>
        ) : null}
        {right && <Spacer width={SPACE_8} />}
        {right && <View paddingRight={SPACE_12}>{right}</View>}
      </View>
    </View>
  );
};

export default TextInputDefault;

const styles = StyleSheet.create({
  input: {
    margin: 0,
    flex: 1,
    height: 48,
  },
  clearButton: {
    padding: SPACE_8,
  },
});
