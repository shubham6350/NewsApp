import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  hiddenMain: {
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#EAEAEA",
  },
  hiddenContainer: {
    backgroundColor: "#4BBDFC",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "80%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    width: "18%",
  },
  cardContainer: {
    backgroundColor: "white",
  },
  IconContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  IconText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "400",
  },
});