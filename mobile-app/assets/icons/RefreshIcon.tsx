import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const RefreshIcon = (props) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_1_52)">
      <Path
        d="M22.1667 9.33332L17.5 14H21C21 17.8675 17.8675 21 14 21C12.8158 21 11.7075 20.7025 10.7275 20.1892L9.02417 21.8925C10.4708 22.7967 12.1683 23.3333 14 23.3333C19.1567 23.3333 23.3333 19.1567 23.3333 14H26.8333L22.1667 9.33332ZM7 14C7 10.1325 10.1325 6.99999 14 6.99999C15.1842 6.99999 16.2925 7.29749 17.2725 7.81082L18.9758 6.10749C17.5292 5.20332 15.8317 4.66666 14 4.66666C8.84334 4.66666 4.66667 8.84332 4.66667 14H1.16667L5.83334 18.6667L10.5 14H7Z"
        fill="black"
        fillOpacity={0.5}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1_52">
        <Rect width={28} height={28} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default RefreshIcon;
