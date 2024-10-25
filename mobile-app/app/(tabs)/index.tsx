import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import useFetch from "@/hooks/customHooks/useFetch";
import { SwipeListView } from "react-native-swipe-list-view";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import PinIcon from "@/assets/icons/PinIcon";
import { styles } from "./Home.style";

const HomeScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const fromDate = "2024-10-10"; // Example date
  const toDate = "2024-10-20";

  const teslaUrl = `https://asia-south1-kc-stage-rp.cloudfunctions.net/globalNews?endpoint=everything&q=tesla&from=${fromDate}&sortBy=publishedAt`;
  const {
    data: teslaNews,
    loading: teslaLoading,
    error: teslaError,
  } = useFetch(teslaUrl);

  useEffect(() => {
    setNewsData(teslaNews?.articles);
  }, [teslaNews]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <SwipeListView
          data={newsData}
          renderItem={(data, rowMap) => (
            <View style={styles.cardContainer}>
              <NewsCard />
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.hiddenMain}>
              <View style={styles.hiddenContainer}>
                <TouchableOpacity style={styles.IconContainer}>
                  <DeleteIcon />
                  <Text style={styles.IconText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconContainer}>
                  <PinIcon />
                  <Text style={styles.IconText}>Pin</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
        />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
