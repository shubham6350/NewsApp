import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./NewCard.style";
import { parseISO, format } from "date-fns";
import PinnedIcon from "@/assets/icons/PinnedIcon";
import { router } from "expo-router";

const NewsCard = ({ data, isPinned }: any) => {
  const date = parseISO(data?.publishedAt);
  const formattedTime = format(date, "hh:mm a");

  const handlePressCard = (url: string) => {
    router.push(url);
  };

  const truncateText = (text: string) => {
    const words = text.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return text;
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={() => handlePressCard(data?.url)}
        style={styles.container}
      >
        {isPinned && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 4,
            }}
          >
            <PinnedIcon />
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#808080" }}>
              Pinned on top
            </Text>
          </View>
        )}

        <View style={styles.titleBox}>
          <View>
            <Text style={styles.title}>{data?.source?.name}</Text>
          </View>
          <View>
            <Text style={styles.timeStamp}>{formattedTime}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <View style={{ maxWidth: 250 }}>
            <Text style={styles.descriptionText}>
              {truncateText(data?.title)}
            </Text>
          </View>
          <Image source={{ uri: data?.urlToImage }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.autherText}>{data?.author}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default NewsCard;
