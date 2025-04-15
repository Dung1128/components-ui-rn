import { Platform, StyleSheet } from "react-native";
import {
  DIMENSION_PADDING_MEDIUM,
  DIMENSION_PADDING_SMALL,
} from "./dimensions";

import white from "./white";
import blue from "./blue";
import ink from "./ink";
import { isAndroid } from "@/utils";

export default StyleSheet.create({
  container: { flex: 1 },
  containerBg: { flex: 1, backgroundColor: white.WHITE100 },
  containerBgWhite: { flex: 1, backgroundColor: "#fff" },
  center: {
    paddingHorizontal: DIMENSION_PADDING_MEDIUM,
    alignItems: "center",
    justifyContent: "center",
  },
  end: { alignItems: "flex-end" },
  start: { alignItems: "flex-start" },
  centerHorizontal: { justifyContent: "center" },
  icon: {
    backgroundColor: blue.BLUE100,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  txtSmallBold: {
    fontSize: 12,
    color: ink.INK80,
    fontWeight: "600",
  },
  button: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: white.WHITE100,
    marginHorizontal: DIMENSION_PADDING_SMALL,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  transparent: {
    backgroundColor: "transparent",
  },

  //MARK: text size
  text10: {
    fontSize: 10 + (isAndroid ? 1 : 2),
    lineHeight: 12 + (isAndroid ? 2 : 4),
  },
  text12: {
    fontSize: 12 + (isAndroid ? 1 : 2),
    lineHeight: 16 + (isAndroid ? 2 : 4),
  },
  text14: {
    fontSize: 14 + (isAndroid ? 1 : 2),
    lineHeight: 20 + (isAndroid ? 2 : 4),
  },
  text16: {
    fontSize: 16 + (isAndroid ? 1 : 2),
    lineHeight: 24 + (isAndroid ? 2 : 4),
  },
  text18: {
    fontSize: 18 + (isAndroid ? 1 : 2),
    lineHeight: 28 + (isAndroid ? 1 : 2),
  },
  text20: {
    fontSize: 20 + (isAndroid ? 1 : 2),
    lineHeight: 28 + (isAndroid ? 1 : 2),
  },
  text22: {
    fontSize: 22 + (isAndroid ? 1 : 2),
    lineHeight: 30 + (isAndroid ? 1 : 2),
  },
  text24: {
    fontSize: 24 + (isAndroid ? 1 : 2),
    lineHeight: 32 + (isAndroid ? 1 : 2),
  },
  text26: {
    fontSize: 26 + (isAndroid ? 1 : 2),
    lineHeight: 34 + (isAndroid ? 1 : 2),
  },
  text28: {
    fontSize: 28 + (isAndroid ? 1 : 2),
    lineHeight: 36 + (isAndroid ? 1 : 2),
  },
  text30: {
    fontSize: 30 + (isAndroid ? 1 : 2),
    lineHeight: 38 + (isAndroid ? 1 : 2),
  },
  text32: {
    fontSize: 32 + (isAndroid ? 1 : 2),
    lineHeight: 40,
  },

  //MARK:fonts
  textRegular: {
    fontFamily: "Inter-Regular",
    fontWeight: "400",
  },
  textMedium: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  textBold: {
    fontFamily: "Inter-Bold",
    fontWeight: "600",
  },
  styleIcon: {
    width: 24,
    height: 24,
  },
});
