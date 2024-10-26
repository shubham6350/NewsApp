import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import LogoIcon from "@/assets/icons/LogoIcon";
import RefreshIcon from "@/assets/icons/RefreshIcon";
import { styles } from "./Header.styles";

type headerPropTypes = {
  onPressRefreshButton?: () => void;
};

const Header: FC<headerPropTypes> = ({ onPressRefreshButton }) => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <LogoIcon />
        <TouchableOpacity>
          <RefreshIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
