//
//  Created by Dung Nguyen on 08/01/25.
//
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
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
import Text from "../Text";
import View from "../View";
import { useInternalTheme } from "../..//core/theming";
import { ThemeProp } from "../../types";
import Spacer from "../Spacer";
import Icon from "../Icon";
import containerStyles from "../../theme/container-styles";

export interface TextInputNumberProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  value?: string | number;
  label?: string;
  textError?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
  prefix?: string;
  suffix?: string;
  onChangeText?: (value: string) => void;
  clearButton?: boolean;
  theme?: ThemeProp;
  maxValue?: number;
  minValue?: number;
  type?: "integer" | "float";
  formatDecimal?: 1 | 2 | 3;
  required?: boolean;
}

function formatNumberInput(value: string, formatDecimal: 1 | 2 | 3): string {
  if (!value) return "";
  if (value === "") return "";
  // Xử lý số âm
  const isNegative = value.startsWith("-");
  let [intPart, decimalPart] = value.replace(/[^0-9.]/g, "").split(".");

  // Format phần nguyên
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Giới hạn phần thập phân 3 số
  if (decimalPart) decimalPart = decimalPart.slice(0, formatDecimal);
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
  left,
  right,
  onChangeText,
  disabled = false,
  theme: themeOverrides,
  prefix = "",
  suffix = "",
  clearButton = false,
  maxValue = 999999999999,
  minValue = 0,
  type = "integer",
  formatDecimal = 3,
  required = false,
  ...props
}: TextInputNumberProps) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const [isShowModalKeyboard, setIsShowModalKeyboard] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
  const [numberValue, setNumberValue] = useState<string>(
    value?.toString() || ""
  );

  const [canSave, setCanSave] = useState<boolean>(true);
  const [isFirstInput, setIsFirstInput] = useState<boolean>(false);

  const disabledTextStyle = {
    color: colors.textSecondary,
  };

  useEffect(() => {
    setInputValue(value?.toString() || "");
    setNumberValue(value?.toString() || "");
  }, [value]);

  useEffect(() => {
    const currentValue = Number(inputValue);
    const minValueNumber = Number(minValue);
    setCanSave(
      !isNaN(currentValue) &&
        !isNaN(minValueNumber) &&
        currentValue >= minValueNumber
    );
  }, [inputValue, minValue]);

  const getColorValue = useMemo(() => {
    if (disabled) {
      return colors.textPlaceholder;
    }

    if (textError.length > 0) {
      return colors.textErrorDefault;
    }

    if (numberValue.length > 0) {
      return colors.textDefault;
    }
    return colors.textSecondary;
  }, [colors, textError, disabled, numberValue]);

  const handleKeyPress = (key: string) => {
    if (key === "del") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (key === "000") {
      if (type === "integer" && inputValue.length > 0) {
        setInputValue((prev) => prev + "000");
        setIsFirstInput(false);
      }
    } else if (key === ".") {
      if (!inputValue.includes(".")) {
        // Nếu inputValue là "0" hoặc rỗng, giữ lại số 0 và thêm dấu "."
        if (inputValue === "0" || inputValue === "") {
          setInputValue("0.");
        } else {
          setInputValue((prev) => prev + key);
        }
        setIsFirstInput(false);
      }
    } else {
      if (isFirstInput) {
        setInputValue(key);
        setIsFirstInput(false);
      } else {
        const newInputValue = inputValue + key;
        const newValue = Number(newInputValue);
        const maxValueNumber = Number(maxValue);

        if (
          !isNaN(newValue) &&
          !isNaN(maxValueNumber) &&
          newValue <= maxValueNumber
        ) {
          if (inputValue.includes(".")) {
            const [intPart, decimalPart = ""] = inputValue.split(".");
            if (intPart.length < 12 && decimalPart.length === 0) {
              setInputValue((prev) => prev + key);
            } else if (decimalPart.length < 3) {
              setInputValue((prev) => prev + key);
            }
          } else {
            if (inputValue.length < 12) {
              setInputValue((prev) => prev + key);
            }
          }
        }
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleClearInput = () => {
    setInputValue("");
    setNumberValue("");
    onChangeText?.("");
  };

  const handleSave = () => {
    let finalValue = inputValue;
    if (inputValue.endsWith(".")) {
      finalValue = inputValue.slice(0, -1);
    }
    onChangeText?.(finalValue);
    setNumberValue(finalValue);
    setIsShowModalKeyboard(false);
  };

  const checkValueEmpty = () => {
    if (value === undefined || value === null || value.toString() === "") {
      return true;
    }
    return false;
  };

  console.log(value, "value");

  const checkLabelEmpty = () => {
    if (label === undefined || label === null || label.toString() === "") {
      return true;
    }
    return false;
  };

  const onShowModalKeyboard = () => {
    setIsShowModalKeyboard(true);
    setIsFirstInput(true);
  };

  const onCloseModalKeyboard = () => {
    setIsShowModalKeyboard(false);
    setTimeout(() => {
      setInputValue(value?.toString() || "");
    }, 300);
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

            textError.length > 0 && [
              {
                borderColor: colors.borderErrorDefault,
                backgroundColor: colors.surfacePrimaryDefault,
              },
            ],
            disabled && [
              styles.disabled,
              {
                borderColor: colors.borderPrimaryDisabled,
                backgroundColor: colors.surfacePrimaryDisabled,
              },
            ],
            style,
          ]}
        >
          <Spacer width={SPACE_12} />
          {left && (
            <View center paddingRight={SPACE_8} height={"100%"}>
              {left}
            </View>
          )}

          <View full paddingRight={SPACE_4}>
            {!checkValueEmpty() && !checkLabelEmpty() && (
              <Text
                size={12}
                color={colors.textSecondary}
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
                {required && <Text color={colors.textErrorDefault}> *</Text>}
              </Text>
            )}
            <View row alignCenter>
              {!checkValueEmpty() && prefix.toString() !== "" && (
                <Text
                  numberOfLines={1}
                  color={colors.textSecondary}
                  style={[disabled && disabledTextStyle]}
                >
                  {prefix}
                  {` `}
                </Text>
              )}
              <View full>
                <Text
                  numberOfLines={1}
                  color={getColorValue}
                  style={[disabled && disabledTextStyle]}
                >
                  {checkValueEmpty()
                    ? label
                    : formatNumberInput(numberValue, formatDecimal)}
                  {checkValueEmpty() && required && (
                    <Text color={colors.textErrorDefault}> *</Text>
                  )}
                </Text>
              </View>
              {!checkValueEmpty() && suffix.toString() !== "" && (
                <Text
                  numberOfLines={1}
                  color={colors.textSecondary}
                  style={[disabled && disabledTextStyle]}
                >
                  {` `}
                  {suffix}
                </Text>
              )}
            </View>
          </View>
          {clearButton && !checkValueEmpty() && (
            <TouchableOpacity activeOpacity={0.8} onPress={handleClearInput}>
              <Icon name={"IconClearText"} type="Svg" size={24} />
            </TouchableOpacity>
          )}
          {right && numberValue && (
            <Spacer
              width={1}
              height={24}
              backgroundColor={theme.colors.borderPrimaryDefault}
              style={{
                marginLeft: SPACE_4,
              }}
            />
          )}
          {right && (
            <View center paddingLeft={SPACE_8} height={"100%"}>
              {right}
            </View>
          )}

          <Spacer width={SPACE_12} />
        </View>
      </ScaleButton>
      {!disabled && textError.length > 0 && (
        <View paddingHorizontal={SPACE_12} paddingVertical={SPACE_4}>
          <Text
            size={12}
            numberOfLines={1}
            color={theme.colors.textErrorDefault}
          >
            {textError}
          </Text>
        </View>
      )}

      <Modal
        visible={isShowModalKeyboard}
        transparent
        animationType="fade"
        onRequestClose={onCloseModalKeyboard}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onCloseModalKeyboard}
        >
          <View
            onPress={() => {}}
            activeOpacity={1}
            backgroundColor={colors.surfacePrimaryDefault}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>{label}</Text>
            <View width={"100%"}>
              <View paddingHorizontal={SPACE_40}>
                <Text numberOfLines={1} style={styles.valueText}>
                  {formatNumberInput(inputValue, formatDecimal) || "0"}
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
                [type === "integer" ? "000" : ".", "0", "del"],
              ].map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keyboardRow}>
                  {row.map((key) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={key}
                      style={[
                        styles.keyButton,
                        key === "000" && type === "float" && styles.disabledKey,
                        key === "." &&
                          inputValue.includes(".") &&
                          styles.disabledKey,
                      ]}
                      onPress={() => handleKeyPress(key)}
                      disabled={
                        (key === "000" && type === "float") ||
                        (key === "." && inputValue.includes("."))
                      }
                    >
                      {key === "del" ? (
                        <Icon name="IconDelNumber" type="Svg" size={24} />
                      ) : (
                        <Text
                          style={[
                            styles.keyText,
                            key === "000" &&
                              type === "float" &&
                              styles.disabledKeyText,
                            key === "." &&
                              inputValue.includes(".") &&
                              styles.disabledKeyText,
                          ]}
                        >
                          {key}
                        </Text>
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
                style={[styles.actionButton, !canSave && { opacity: 0.5 }]}
                onPress={handleSave}
                disabled={!canSave}
              >
                <Text
                  style={[
                    styles.actionText,
                    { color: colors.textBrandDefault },
                    !canSave && { color: colors.textSecondary },
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
  disabledKey: {
    opacity: 0.5,
  },
  disabledKeyText: {
    opacity: 0.5,
  },
});

export default React.memo(TextInputNumber);
