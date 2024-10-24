import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#EAEAEA",
  },
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 16,
  },
  titleBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {},
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#808080",
  },
  timeStamp: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionText: {
    fontFamily: "",
    fontWeight: "700",
    fontSize: 18,
    color: " #000000",
  },
  image: {
    height: 77,
    width: 77,
    borderRadius: 14,
  },
  auther: {},
  autherText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#808080",
  },
});
