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
import {
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
} from "./constants";
import { getOutlinedInputColors } from "./helpers";
import type { RenderProps, ChildTextInputProps } from "./types";
import { CONSTANTS } from "../../styles/themes/tokens";
import Spacer from "../Spacer";
import Icon from "../Icon";
import Text from "../Text";

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
  value = "",
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

  const getLabelColor = () => {
    if (disabled) {
      return theme.colors.textSecondary;
    } else if (parentState.focused) {
      return activeColor;
    } else {
      return theme.colors.textSecondary;
    }
  };

  const renderLabel = () => {
    if (
      parentState.focused ||
      (parentState.value !== undefined && parentState.value?.toString() !== "")
    ) {
      return (
        <View paddingTop={CONSTANTS.SPACE_4}>
          <Text color={getLabelColor()} size={MINIMIZED_LABEL_FONT_SIZE}>
            {label}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  return (
    <View style={viewStyle}>
      <View
        row
        alignCenter
        justifyCenter
        style={[
          {
            borderRadius: CONSTANTS.BORDER_RADIUS_6,
            borderWidth: 1,
            borderColor: getBorderColor(),
            overflow: "hidden",
            backgroundColor: disabled
              ? theme.colors.surfacePrimaryDisabled
              : theme.colors.surfacePrimaryDefault,
          },
          contentStyle,
        ]}
      >
        {<View paddingLeft={CONSTANTS.SPACE_12}>{left}</View>}
        {left && <Spacer width={CONSTANTS.SPACE_8} />}
        <View
          full
          style={{
            height: height || 48,
          }}
        >
          {multiline && renderLabel()}
          {render?.({
            ...rest,
            ref: innerRef,
            onChangeText: handleChangeText,
            value: inputValue,
            placeholder:
              parentState.value?.toString() == ""
                ? parentState.focused
                  ? rest.placeholder
                  : label
                : rest.placeholder,
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
                height: height ? height : 48,
                paddingTop:
                  Platform.OS === "android"
                    ? multiline
                      ? CONSTANTS.SPACE_2
                      : CONSTANTS.SPACE_8
                    : CONSTANTS.SPACE_4,
              },
              contentStyle,
            ],
          } as RenderProps)}
        </View>

        {!disabled && clearButton && inputValue ? (
          <TouchableOpacity
            onPress={handleClear}
            style={multiline ? styles.clearButtonMultiline : styles.clearButton}
          >
            <Icon name={"IconClearText"} type="Svg" size={24} />
          </TouchableOpacity>
        ) : (
          <Spacer width={CONSTANTS.SPACE_12} />
        )}
        {right && <Spacer width={CONSTANTS.SPACE_8} />}
        {right && <View paddingRight={CONSTANTS.SPACE_12}>{right}</View>}
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
    paddingLeft: 0,
    paddingTop: Platform.OS === "ios" ? CONSTANTS.SPACE_4 : CONSTANTS.SPACE_2,
  },
  clearButtonMultiline: {
    paddingRight: CONSTANTS.SPACE_12,
    height: "100%",
    paddingTop: CONSTANTS.SPACE_12,
  },
  clearButton: {
    justifyContent: "center",
    paddingHorizontal: CONSTANTS.SPACE_8,
  },
});
