import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import useFetch from "@/hooks/customHooks/useFetch";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import PinIcon from "@/assets/icons/PinIcon";
import { styles } from "./Home.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  title: string;
  description: string;
  publishedAt: string;
  source: Source;
  url: string;
  urlToImage: string;
}

const HomeScreen = () => {
  const fromDate = new Date();
  const url = `https://asia-south1-kc-stage-rp.cloudfunctions.net/globalNews?endpoint=everything&q=tesla&from=${fromDate}&sortBy=publishedAt`;
  const { data, loading, error } = useFetch(url);
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [pinnedHeadlines, setPinnedHeadlines] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(10);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const loadHeadlines = async () => {
      const storedHeadlines = await AsyncStorage.getItem("headlines");
      if (storedHeadlines) {
        const parsedHeadlines: Article[] = JSON.parse(storedHeadlines);
        setHeadlines(parsedHeadlines.slice(0, 10)); // Initially show the first 10 headlines
      }
    };

    loadHeadlines();
  }, []);

  // useEffect(() => {
  //   const id = setInterval(async () => {
  //     const storedHeadlines = await AsyncStorage.getItem("headlines");
  //     if (storedHeadlines) {
  //       const parsedHeadlines: Article[] = JSON.parse(storedHeadlines);
  //       const newBatch = parsedHeadlines.slice(currentIndex, currentIndex + 5);
  //       setHeadlines((prevHeadlines) => [...newBatch, ...prevHeadlines]);
  //       setCurrentIndex((prevIndex) => prevIndex + 5);

  //       // Reset AsyncStorage when all headlines are displayed
  //       if (currentIndex >= parsedHeadlines.length) {
  //         clearInterval(id);
  //         await AsyncStorage.removeItem("headlines");
  //       }
  //     }
  //   }, 10000); // 10 seconds interval

  //   setTimerId(id);
  //   return () => clearInterval(id);
  // }, [currentIndex]);

  const handlePressDelete = (article: Article) => {
    setHeadlines((prevHeadlines) =>
      prevHeadlines.filter((item) => item.title !== article.title)
    );
  };
  const handlePressPin = (article: Article) => {
    if (!pinnedHeadlines.some((item) => item.title === article.title)) {
      setPinnedHeadlines((prevPinned) => [...prevPinned, article]);
      setHeadlines((prevHeadlines) =>
        prevHeadlines.filter((item) => item.title !== article.title)
      );
    }
  };

  const renderItem = ({ item }: { item: Article[] }) => {
    const isPinned = pinnedHeadlines.some(
      (pinnedItem) => pinnedItem.title === item.title
    );
    return (
      <Swipeable
        renderRightActions={() => (
          <View style={styles.hiddenMain}>
            <View style={styles.hiddenContainer}>
              <TouchableOpacity
                onPress={() => handlePressDelete(item)}
                style={styles.IconContainer}
              >
                <DeleteIcon />
                <Text style={styles.IconText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePressPin(item)}
                style={styles.IconContainer}
              >
                <PinIcon />
                <Text style={styles.IconText}>Pin</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <NewsCard data={item} isPinned={isPinned} />
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <FlatList
            data={[...pinnedHeadlines, ...headlines]}
            keyExtractor={(item, index) => item.title + index}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default HomeScreen;
