import { StyleSheet } from "react-native";
import { SPACE_16, SPACE_8 } from "./dimensions";

import white from "./white";
import blue from "./blue";
import ink from "./ink";

export default StyleSheet.create({
  container: { flex: 1 },
  center: {
    paddingHorizontal: SPACE_16,
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
    marginHorizontal: SPACE_8,
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
    fontSize: 10,
    lineHeight: 12,
  },
  text12: {
    fontSize: 12,
    lineHeight: 16,
  },
  text14: {
    fontSize: 14,
    lineHeight: 20,
  },
  text16: {
    fontSize: 16,
    lineHeight: 24,
  },
  text18: {
    fontSize: 18,
    lineHeight: 28,
  },
  text20: {
    fontSize: 20,
    lineHeight: 28,
  },
  text22: {
    fontSize: 22,
    lineHeight: 30,
  },
  text24: {
    fontSize: 24,
    lineHeight: 32,
  },
  text26: {
    fontSize: 26,
    lineHeight: 34,
  },
  text28: {
    fontSize: 28,
    lineHeight: 36,
  },
  text30: {
    fontSize: 30,
    lineHeight: 38,
  },
  text32: {
    fontSize: 32,
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
