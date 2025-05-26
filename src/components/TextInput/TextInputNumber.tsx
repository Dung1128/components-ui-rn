//
//  Created by Dung Nguyen on 08/01/25.
//
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  TextStyle,
  TouchableOpacity,
  Modal,
} from "react-native";

import {
  BUTTON_HEIGHT_SMALL,
  SPACE_12,
  BORDER_RADIUS_6,
  BORDER_WIDTH_1,
  SPACE_6,
  SPACE_4,
  SPACE_8,
  SPACE_40,
} from "@/theme/dimensions";
import ScaleButton from "../ScaleButton";
import Text, { IText } from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";
import Icon from "../Icon";
import containerStyles from "../../theme/container-styles";

export interface TextInputNumberProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
  value?: string;
  label?: string;
  textError?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  textProps?: IText;
  textColor?: string;
  labelColor?: string;
  textStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  prefix?: string;
  onChangeText?: (value: string) => void;
  clearButton?: boolean;
  theme?: ThemeProp;
}

function formatNumberInput(value: string): string {
  if (!value) return "0";
  // Xử lý số âm
  const isNegative = value.startsWith("-");
  let [intPart, decimalPart] = value.replace(/[^0-9.]/g, "").split(".");
  // Format phần nguyên
  intPart = intPart.replace(/^0+(?=\d)/, ""); // Loại bỏ số 0 đầu nếu có
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Giới hạn phần thập phân 3 số
  if (decimalPart) decimalPart = decimalPart.slice(0, 3);
  let result = intPart;
  if (decimalPart !== undefined) result += "." + decimalPart;
  if (isNegative) result = "-" + result;
  return result;
}

const TextInputNumber = ({
  style,
  value = "",
  label = "",
  textError = "",
  borderColor,
  left,
  right,
  textStyle,
  labelStyle,
  textProps,
  onChangeText,
  disabled = false,
  textColor,
  labelColor,
  theme: themeOverrides,
  prefix = "",
  clearButton = false,
  ...props
}: TextInputNumberProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const [isShowModalKeyboard, setIsShowModalKeyboard] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");

  const disabledTextStyle = {
    color: colors.textSecondary,
  };

  const getColorValue = useMemo(() => {
    if (textError.length > 0) {
      return colors.textErrorDefault;
    }
    if (disabled) {
      return colors.textPlaceholder;
    }
    if (value.length > 0) {
      return colors.textDefault;
    }
    return textColor || colors.textSecondary;
  }, [textColor, colors, textError, disabled, value]);

  const handleKeyPress = (key: string) => {
    if (key === "del") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (key === ".") {
      if (!inputValue.includes(".") && inputValue.length > 0)
        setInputValue((prev) => prev + key);
    } else {
      if (inputValue.includes(".")) {
        const [intPart, decimalPart = ""] = inputValue.split(".");
        // Giới hạn phần nguyên 10 số, phần thập phân 3 số
        if (intPart.length < 10 && decimalPart.length === 0) {
          setInputValue((prev) => prev + key);
        } else if (decimalPart.length < 3) {
          setInputValue((prev) => prev + key);
        }
      } else {
        // Chỉ cho phép phần nguyên tối đa 10 số
        if (inputValue.length < 10) {
          setInputValue((prev) => (prev === "0" ? key : prev + key));
        }
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
    onChangeText?.("");
  };

  const handleSave = () => {
    onChangeText?.(inputValue);
    setIsShowModalKeyboard(false);
  };

  const checkValueEmpty = () => {
    if (value.toString() === "") {
      return true;
    }
    return false;
  };

  const checkLabelEmpty = () => {
    if (label.toString() === "") {
      return true;
    }
    return false;
  };

  const onShowModalKeyboard = () => {
    setIsShowModalKeyboard(true);
  };

  const onCloseModalKeyboard = () => {
    setIsShowModalKeyboard(false);
  };

  return (
    <View>
      <ScaleButton
        activeOpacity={0.8}
        onPress={onShowModalKeyboard}
        {...props}
        disabled={disabled || false}
      >
        <View
          style={[
            styles.container,
            {
              borderRadius: BORDER_RADIUS_6,
            },

            [styles.border, { borderColor: colors.borderPrimaryDefault }],
            borderColor && { borderColor: borderColor },
            disabled && [
              styles.disabled,
              {
                borderColor: colors.borderPrimaryDisabled,
                backgroundColor: colors.surfacePrimaryDisabled,
              },
            ],
            textError.length > 0 && [
              {
                borderColor: colors.borderErrorDefault,
                backgroundColor: colors.surfacePrimaryDefault,
              },
            ],
            style,
          ]}
        >
          <Spacer width={SPACE_12} />
          {left && (
            <View paddingRight={SPACE_8} height={"100%"}>
              {left}
            </View>
          )}

          <View full>
            {!checkValueEmpty() && !checkLabelEmpty() && (
              <Text
                size={12}
                color={labelColor || colors.textSecondary}
                style={[
                  disabled && {
                    color: colors.textPlaceholder,
                  },
                  textError.length > 0 && {
                    color: colors.textErrorDefault,
                  },
                ]}
              >
                {label}
              </Text>
            )}
            <View row alignCenter>
              {!checkValueEmpty() && prefix.toString() !== "" && (
                <Text
                  numberOfLines={1}
                  color={colors.textSecondary}
                  style={[disabled && disabledTextStyle, textStyle]}
                  {...textProps}
                >
                  {prefix}
                  {` `}
                </Text>
              )}
              <View full>
                <Text
                  numberOfLines={1}
                  color={getColorValue}
                  style={[disabled && disabledTextStyle, textStyle]}
                  {...textProps}
                >
                  {checkValueEmpty() ? label : formatNumberInput(value)}
                </Text>
              </View>
            </View>
          </View>
          {clearButton && !checkValueEmpty() && (
            <TouchableOpacity activeOpacity={0.8} onPress={handleClear}>
              <Icon name={"IconClearText"} type="Svg" size={24} />
            </TouchableOpacity>
          )}
          {right && (
            <View paddingLeft={SPACE_8} height={"100%"}>
              {right}
            </View>
          )}

          <Spacer width={SPACE_12} />
        </View>
      </ScaleButton>
      {textError.length > 0 && (
        <View paddingHorizontal={SPACE_12} paddingVertical={SPACE_4}>
          <Text style={styles.text12} color={colors.textErrorDefault}>
            {textError}
          </Text>
        </View>
      )}

      <Modal
        visible={isShowModalKeyboard}
        transparent
        animationType="fade"
        // onRequestClose={onCloseModalKeyboard}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          // onPress={onCloseModalKeyboard}
        >
          <View
            backgroundColor={colors.surfacePrimaryDefault}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>{label}</Text>
            <View width={"100%"}>
              <View paddingHorizontal={SPACE_40}>
                <Text numberOfLines={1} style={styles.valueText}>
                  {formatNumberInput(inputValue) || "0"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleClear}
                style={styles.clearButton}
              >
                <Icon
                  name="IconClearText"
                  type="Svg"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.keyboardGrid}>
              {[
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"],
                [".", "0", "del"],
              ].map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keyboardRow}>
                  {row.map((key) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={key}
                      style={styles.keyButton}
                      onPress={() => handleKeyPress(key)}
                    >
                      {key === "del" ? (
                        <Icon name="IconDelNumber" type="Svg" size={24} />
                      ) : (
                        <Text style={styles.keyText}>{key}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={onCloseModalKeyboard}
              >
                <Text style={styles.actionText}>Đóng</Text>
              </TouchableOpacity>
              <Spacer
                style={{
                  height: "100%",
                }}
                width={1}
                backgroundColor={colors.borderPrimaryDefault}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Text
                  style={[
                    styles.actionText,
                    { color: colors.textBrandDefault },
                  ]}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
  disabled: { opacity: 0.6 },
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACE_6,
  },
  border: {
    borderWidth: BORDER_WIDTH_1,
  },
  small: {
    height: BUTTON_HEIGHT_SMALL,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    width: "90%",
    paddingBottom: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },

  valueText: {
    fontSize: 30,
    textAlign: "center",
  },
  clearButton: {
    padding: 8,
    position: "absolute",
    right: SPACE_12,
  },
  keyboardGrid: {
    marginVertical: 8,
    width: "90%",
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  keyButton: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  keyText: {
    fontSize: 22,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    width: "90%",
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default React.memo(TextInputNumber);
