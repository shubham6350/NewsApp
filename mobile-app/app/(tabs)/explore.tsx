import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
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

const TeslaScreen = () => {
  const API_KEY = process.env.API_KEY;
  const { data, loading, error } = useFetch({
    fromDate: new Date(),
    url: `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${API_KEY}`,
    delay: 5000,
  });
  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [pinnedHeadlines, setPinnedHeadlines] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(10);
  const [isloading, setIsLoading] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadHeadlines = async () => {
      const storedHeadlines = await AsyncStorage.getItem("Teslaheadlines");
      if (storedHeadlines) {
        const parsedHeadlines: Article[] = JSON.parse(storedHeadlines);
        setHeadlines(parsedHeadlines.slice(0, 10)); // Initially show the first 10 headlines
      }
    };

    loadHeadlines();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchNextBatch(false); // Automatic fetch every 10 seconds
    }, 10000); // 10 seconds interval

    setTimerId(id);
    return () => clearInterval(id);
  }, [currentIndex]);

  const fetchNextBatch = async (isManual: boolean) => {
    if (isManual) setIsLoading(true);
    const storedHeadlines = await AsyncStorage.getItem("Appleheadlines");
    if (storedHeadlines) {
      const parsedHeadlines: Article[] = JSON.parse(storedHeadlines);
      const newBatch = parsedHeadlines.slice(currentIndex, currentIndex + 5);

      // Handle automatic fetch: replace top 5 headlines with new batch
      if (!isManual) {
        if (newBatch.length > 0) {
          setHeadlines((prevHeadlines) => {
            const updatedHeadlines = [...newBatch, ...prevHeadlines.slice(5)];
            return updatedHeadlines.length > 10
              ? updatedHeadlines.slice(0, 10)
              : updatedHeadlines;
          });
          setCurrentIndex((prevIndex) => prevIndex + 5);
        }

        // Reset AsyncStorage when all headlines are displayed
        if (currentIndex + 5 >= parsedHeadlines.length) {
          await AsyncStorage.removeItem("headlines");
          setHeadlines([]);
          setCurrentIndex(0);
        }
      } else {
        // Handle manual fetch: append new batch
        if (newBatch.length > 0) {
          setHeadlines((prevHeadlines) => {
            const updatedHeadlines = [...prevHeadlines, ...newBatch];
            return updatedHeadlines.length > 10
              ? updatedHeadlines.slice(0, 10)
              : updatedHeadlines;
          });
          setCurrentIndex((prevIndex) => prevIndex + 5);
        }
      }
    }
    if (isManual) setIsLoading(false);
  };

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

  if (isloading || loading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={"black"} />
    </View>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header onPressRefreshButton={() => fetchNextBatch(true)} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={[...pinnedHeadlines, ...headlines]}
            keyExtractor={(item, index) => item.title + index}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default TeslaScreen;
