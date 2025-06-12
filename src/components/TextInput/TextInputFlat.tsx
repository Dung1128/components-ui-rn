import * as React from "react";
import {
  I18nManager,
  Platform,
  StyleSheet,
  TextInput as NativeTextInput,
  TextStyle,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";

import { getAdornmentConfig } from "./Adornment/TextInputAdornment";
import {
  LABEL_PADDING_TOP_DENSE,
  LABEL_WIGGLE_X_OFFSET,
  MAXIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_FONT_SIZE,
  MINIMIZED_LABEL_Y_OFFSET,
  MIN_DENSE_HEIGHT,
  MIN_DENSE_HEIGHT_WL,
} from "./constants";
import {
  adjustPaddingFlat,
  calculateFlatInputHorizontalPadding,
  calculateInputHeight,
  calculateLabelTopPosition,
  calculatePadding,
  getConstants,
  getFlatInputColors,
  Padding,
} from "./helpers";
import InputLabel from "./Label/InputLabel";
import type { ChildTextInputProps, RenderProps } from "./types";
import { Outline } from "./Addons/Outline";
import Spacer from "../Spacer";
import {
  BORDER_RADIUS_6,
  SPACE_12,
  SPACE_4,
  SPACE_6,
  SPACE_8,
  SPACE_2,
} from "@/theme/dimensions";
import Icon from "../Icon";
import Text from "../Text";

const TextInputFlat = ({
  disabled = false,
  editable = true,
  label,
  error = false,
  selectionColor: customSelectionColor,
  cursorColor,
  underlineColor,
  underlineStyle,
  activeUnderlineColor,
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
  onLayoutAnimatedText,
  onLabelTextLayout,
  onLeftAffixLayoutChange,
  onRightAffixLayoutChange,
  onInputLayout,
  left,
  right,
  prefix,
  suffix,
  placeholderTextColor,
  clearButton,
  contentStyle,
  scaledLabel,
  outlineStyle,
  outlineColor,
  value,
  textError,
  required,
  ...rest
}: ChildTextInputProps) => {
  const [inputValue, setInputValue] = React.useState(value || "");
  React.useEffect(() => {
    if (value === undefined) {
      setInputValue("");
      onChangeText?.("");
    } else {
      setInputValue(value || "");
    }
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setInputValue("");
    onChangeText?.("");
  };

  const isAndroid = Platform.OS === "android";
  const { roundness } = theme;
  const font = theme.fonts.bodyLarge;
  const hasActiveOutline = parentState.focused || error;

  const { LABEL_PADDING_TOP, FLAT_INPUT_OFFSET, MIN_HEIGHT } = getConstants();

  const {
    fontSize: fontSizeStyle,
    lineHeight: lineHeightStyle,
    fontWeight,
    height,
    paddingHorizontal,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  const lineHeight =
    lineHeightStyle || (Platform.OS === "web" ? fontSize * 1.2 : undefined);

  const isPaddingHorizontalPassed =
    paddingHorizontal !== undefined && typeof paddingHorizontal === "number";

  const adornmentConfig = getAdornmentConfig({
    left,
    right,
  });

  let { paddingLeft, paddingRight } = calculateFlatInputHorizontalPadding({
    adornmentConfig,
  });

  if (isPaddingHorizontalPassed) {
    paddingLeft = paddingHorizontal as number;
    paddingRight = paddingHorizontal as number;
  }

  const {
    inputTextColor,
    activeColor,
    placeholderColor,
    errorColor,
    backgroundColor,
    selectionColor,
  } = getFlatInputColors({
    underlineColor,
    activeUnderlineColor,
    customSelectionColor,
    textColor,
    disabled,
    error,
    theme,
  });

  const containerStyle = {
    backgroundColor,
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness,
  };

  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;

  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;

  const baseLabelTranslateX =
    (I18nManager.getConstants().isRTL ? 1 : -1) *
      (labelHalfWidth - (labelScale * labelWidth) / 2) +
    (1 - labelScale) *
      (I18nManager.getConstants().isRTL ? -1 : 1) *
      paddingLeft;

  const minInputHeight = dense
    ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) - LABEL_PADDING_TOP_DENSE
    : MIN_HEIGHT - LABEL_PADDING_TOP;

  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);

  const topPosition = calculateLabelTopPosition(
    labelHeight,
    inputHeight,
    multiline && height ? 0 : !height ? minInputHeight / 2 : 0
  );

  if (height && typeof height !== "number") {
    // eslint-disable-next-line
    console.warn("Currently we support only numbers in height prop");
  }

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: FLAT_INPUT_OFFSET,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid,
    styles: StyleSheet.flatten(
      dense ? styles.inputFlatDense : styles.inputFlat
    ) as Padding,
  };

  const pad = calculatePadding(paddingSettings);

  const paddingFlat = adjustPaddingFlat({
    ...paddingSettings,
    pad,
  });

  const baseLabelTranslateY =
    -labelHalfHeight - (topPosition + MINIMIZED_LABEL_Y_OFFSET);

  const { current: placeholderOpacityAnims } = React.useRef([
    new Animated.Value(0),
    new Animated.Value(1),
  ]);

  const placeholderOpacity = hasActiveOutline
    ? parentState.labeled
    : placeholderOpacityAnims[parentState.labelLayout.measured ? 1 : 0];

  // We don't want to show placeholder if label is displayed, because they overlap.
  // Before it was done by setting placeholder's value to " ", but inputs have the same props
  // what causes broken styles due to: https://github.com/facebook/react-native/issues/48249
  const placeholderTextColorBasedOnState = parentState.displayPlaceholder
    ? placeholderTextColor ?? placeholderColor
    : "transparent";

  const minHeight =
    height ||
    (dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) : MIN_HEIGHT);

  const labelProps = {
    label,
    onLayoutAnimatedText,
    onLabelTextLayout,
    placeholderOpacity,
    labelError: error,
    placeholderStyle: styles.placeholder,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    lineHeight,
    fontWeight,
    labelScale,
    wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
    topPosition,
    paddingLeft: isAndroid
      ? I18nManager.isRTL
        ? paddingRight
        : paddingLeft
      : paddingLeft,
    paddingRight: isAndroid
      ? I18nManager.isRTL
        ? paddingLeft
        : paddingRight
      : paddingRight,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    errorColor,
    roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier,
    contentStyle,
    inputContainerLayout: parentState.inputContainerLayout,
    labelTextLayout: parentState.labelTextLayout,
    opacity:
      parentState.value || parentState.focused
        ? parentState.labelLayout.measured
          ? 1
          : 0
        : 1,
  };

  const getBorderColor = () => {
    if (disabled) {
      return theme.colors.surfacePrimaryDisabled;
    } else if (parentState.focused) {
      return activeColor;
    } else if (error) {
      return theme.colors.borderErrorDefault;
    } else {
      return theme.colors.borderPrimaryDefault;
    }
  };

  const renderSuffix = () => {
    if (parentState.focused) {
      return (
        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 9 : 14,
          }}
        >
          <Text color={theme.colors.textSecondary}>
            {` `}
            {suffix}
          </Text>
        </View>
      );
    } else if (
      parentState.value !== undefined &&
      parentState.value?.toString() !== ""
    ) {
      return (
        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 9 : 14,
          }}
        >
          <Text color={theme.colors.textSecondary}>
            {` `}
            {suffix}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  const renderPrefix = () => {
    if (parentState.focused) {
      return (
        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 9 : 14,
          }}
        >
          <Text color={theme.colors.textSecondary}>
            {prefix}
            {` `}
          </Text>
        </View>
      );
    } else if (
      parentState.value !== undefined &&
      parentState.value?.toString() !== ""
    ) {
      return (
        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 9 : 14,
          }}
        >
          <Text color={theme.colors.textSecondary}>
            {prefix}
            {` `}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  const checkLineRightAction = () => {
    if (!multiline && right && inputValue) {
      return true;
    }
    if (parentState.focused && right) {
      return true;
    }
    return false;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: BORDER_RADIUS_6,
          borderWidth: 1,
          borderColor: getBorderColor(),
          height: 48,
          overflow: "hidden",
          backgroundColor: disabled
            ? theme.colors.surfacePrimaryDisabled
            : theme.colors.surfacePrimaryDefault,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {left && <View style={{ paddingLeft: SPACE_12 }}>{left}</View>}
          {left ? <Spacer width={SPACE_8} /> : <Spacer width={SPACE_12} />}
        </View>
        <Outline
          style={outlineStyle}
          label={label}
          roundness={roundness}
          hasActiveOutline={hasActiveOutline}
          focused={parentState.focused}
          activeColor={activeColor}
          outlineColor={outlineColor}
          backgroundColor={backgroundColor}
        />

        <View
          onLayout={onInputLayout}
          style={[
            styles.labelContainer,
            {
              minHeight,
              flex: 1,
            },
          ]}
        >
          {/* {!isAndroid && multiline && !!label && !disabled && (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              dense ? styles.densePatchContainer : styles.patchContainer,
              {
                backgroundColor:
                  viewStyle.backgroundColor || containerStyle.backgroundColor,
                left: paddingLeft,
                right: paddingRight,
              },
            ]}
          />
        )} */}
          {label ? (
            <InputLabel
              labeled={parentState.labeled}
              error={parentState.error}
              focused={parentState.focused}
              scaledLabel={scaledLabel}
              wiggle={Boolean(parentState.value && labelProps.labelError)}
              labelLayoutMeasured={parentState.labelLayout.measured}
              labelLayoutWidth={parentState.labelLayout.width}
              labelLayoutHeight={parentState.labelLayout.height}
              required={required}
              {...labelProps}
            />
          ) : null}
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {!multiline &&
              prefix &&
              prefix?.toString() !== "" &&
              renderPrefix()}

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
                // paddingFlat,
                {
                  paddingLeft,
                  paddingRight,
                  paddingTop:
                    parentState.focused || parentState.value ? SPACE_12 : 0,
                  ...font,
                  fontSize,
                  lineHeight,
                  fontWeight,
                  color: inputTextColor,
                  textAlignVertical: multiline ? "top" : "center",
                  marginTop: Platform.OS === "android" ? SPACE_8 : SPACE_2,
                },
                contentStyle,
              ],
            } as RenderProps)}
            {renderSuffix()}
          </View>
        </View>
        {!disabled && clearButton && inputValue ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="IconClearText" type="Svg" size={24} />
          </TouchableOpacity>
        ) : (
          <Spacer width={SPACE_12} />
        )}
        {checkLineRightAction() && (
          <Spacer
            width={1}
            height={24}
            backgroundColor={theme.colors.borderPrimaryDefault}
            style={{
              marginRight: SPACE_8,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {right && !clearButton && <Spacer width={SPACE_8} />}
          {right && (
            <View
              style={{
                paddingRight: SPACE_12,
              }}
            >
              {right}
            </View>
          )}
        </View>
      </View>
      {error && textError?.toString() !== "" && (
        <View style={styles.vError}>
          <Text
            size={12}
            numberOfLines={1}
            color={theme.colors.textErrorDefault}
          >
            {textError}
          </Text>
        </View>
      )}
    </View>
  );
};

export default TextInputFlat;

const styles = StyleSheet.create({
  placeholder: {
    position: "absolute",
    left: 0,
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    // flex: 1,
  },
  input: {
    // margin: 0,
    flex: 1,
    height: 48,
  },
  inputFlat: {
    paddingTop: 24,
    paddingBottom: 4,
  },
  inputFlatDense: {
    paddingTop: 22,
    paddingBottom: 2,
  },
  patchContainer: {
    height: 24,
    zIndex: 2,
  },
  densePatchContainer: {
    height: 22,
    zIndex: 2,
  },
  clearButton: {
    padding: SPACE_6,
  },
  vError: {
    paddingTop: SPACE_4,
    paddingHorizontal: SPACE_12,
  },
});
