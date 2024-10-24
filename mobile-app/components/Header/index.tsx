import React from "react";
import { View, StyleSheet } from "react-native";
import LogoIcon from "@/assets/icons/LogoIcon";
import RefreshIcon from "@/assets/icons/RefreshIcon";
import { styles } from "./Header.styles";

const Header = () => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <LogoIcon />
        <RefreshIcon />
      </View>
    </View>
  );
};
export default Header;
