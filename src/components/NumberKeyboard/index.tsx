//
//  Created by Dung Nguyen on 08/01/25.
//
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";

import { SPACE_12, SPACE_40 } from "@/theme/dimensions";
import Text from "../Text";
import View from "../View";
import { useInternalTheme } from "../../core/theming";
import Spacer from "../Spacer";
import Icon from "../Icon";
import containerStyles from "../../theme/container-styles";

export interface NumberKeyboardProps {
  /** Giá trị hiện tại của input */
  value?: string | number;
  /** Label hiển thị trên modal */
  label?: string;
  /** Callback khi giá trị thay đổi */
  onChangeText?: (value: string) => void;
  /** Giá trị tối đa cho phép */
  maxValue?: number;
  /** Giá trị tối thiểu cho phép */
  minValue?: number;
  /** Loại input: integer hoặc float */
  type?: "integer" | "float";
  /** Số chữ số thập phân cho phép */
  formatDecimal?: 1 | 2 | 3;
  /** Trạng thái hiển thị modal */
  visible: boolean;
  /** Callback khi đóng modal */
  onClose: () => void;
}

const formatNumberInput = (value: string, formatDecimal: 1 | 2 | 3): string => {
  if (!value) return "0";
  const isNegative = value.startsWith("-");
  let [intPart, decimalPart] = value.replace(/[^0-9.]/g, "").split(".");

  intPart = intPart.replace(/^0+(?=\d)/, "");
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart) decimalPart = decimalPart.slice(0, formatDecimal);

  let result = intPart;
  if (decimalPart !== undefined) result += "." + decimalPart;
  if (isNegative) result = "-" + result;

  return result;
};

const NumberKeyboard: React.FC<NumberKeyboardProps> = ({
  value = "",
  label = "",
  onChangeText,
  maxValue = 999999999999,
  minValue = 0,
  type = "integer",
  formatDecimal = 3,
  visible,
  onClose,
}) => {
  const theme = useInternalTheme();
  const { colors } = theme;

  const [inputValue, setInputValue] = useState<string>(value?.toString() || "");
  const [isFirstInput, setIsFirstInput] = useState<boolean>(true);
  const [canSave, setCanSave] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      setInputValue(value?.toString() || "");
      setIsFirstInput(true);
    }
  }, [visible, value]);

  useEffect(() => {
    const currentValue = Number(inputValue);
    const minValueNumber = Number(minValue);
    setCanSave(
      !isNaN(currentValue) &&
        !isNaN(minValueNumber) &&
        currentValue >= minValueNumber
    );
  }, [inputValue, minValue]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === "del") {
        setInputValue((prev) => prev.slice(0, -1));
        setIsFirstInput(false);
        return;
      }

      if (key === "000") {
        if (type === "integer" && inputValue.length > 0) {
          const newInputValue = inputValue + "000";
          const newValue = Number(newInputValue);
          const maxValueNumber = Number(maxValue);

          if (
            !isNaN(newValue) &&
            !isNaN(maxValueNumber) &&
            newValue <= maxValueNumber
          ) {
            setInputValue(newInputValue);
          }
          setIsFirstInput(false);
        }
        return;
      }

      if (key === ".") {
        if (type === "float" && !inputValue.includes(".")) {
          if (inputValue === "0" || inputValue === "") {
            setInputValue("0.");
          } else {
            setInputValue((prev) => prev + key);
          }
          setIsFirstInput(false);
        }
        return;
      }

      if (isFirstInput) {
        setInputValue(key);
        setIsFirstInput(false);
        return;
      }

      // Kiểm tra nếu input bắt đầu bằng 0 và không có dấu chấm
      if (inputValue === "0") {
        if (key === ".") {
          setInputValue("0.");
          return;
        } else if (key >= "1" && key <= "9") {
          setInputValue(key);
          return;
        } else {
          return;
        }
      }

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
          } else if (decimalPart.length < formatDecimal) {
            setInputValue((prev) => prev + key);
          }
        } else {
          if (inputValue.length < 12) {
            setInputValue((prev) => prev + key);
          }
        }
      }
    },
    [inputValue, maxValue, type, formatDecimal, isFirstInput]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setIsFirstInput(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!canSave) return;

    let finalValue = inputValue;
    if (inputValue.endsWith(".")) {
      finalValue = inputValue.slice(0, -1);
    }
    onChangeText?.(finalValue);
    onClose();
  }, [inputValue, onChangeText, onClose, canSave]);

  const handleClose = useCallback(() => {
    onClose();
    setIsFirstInput(true);
  }, [onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <View
          onPress={() => {}}
          activeOpacity={1}
          backgroundColor={colors.surfacePrimaryDefault}
          style={styles.modalContent}
        >
          <Text style={[styles.text18, styles.modalTitle]}>{label}</Text>
          <View width={"100%"}>
            <View paddingHorizontal={SPACE_40}>
              <Text numberOfLines={1} style={[styles.text30, styles.valueText]}>
                {formatNumberInput(inputValue, formatDecimal) || "0"}
              </Text>
            </View>
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
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
                          styles.text22,
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
              onPress={handleClose}
            >
              <Text style={[styles.actionText, styles.text16]}>Đóng</Text>
            </TouchableOpacity>
            <Spacer
              style={{ height: "100%" }}
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
                  styles.text16,
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
  );
};

const styles = StyleSheet.create({
  ...containerStyles,
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
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  valueText: {
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
    fontWeight: "600",
  },
  disabledKey: {
    opacity: 0.5,
  },
  disabledKeyText: {
    opacity: 0.5,
  },
});

export default React.memo(NumberKeyboard);
