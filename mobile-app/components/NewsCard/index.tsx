import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./NewCard.style";

const NewsCard = () => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <View>
            <Text style={styles.title}>Times of India</Text>
          </View>
          <View>
            <Text style={styles.timeStamp}>7:33 AM</Text>
          </View>
        </View>
        <View style={styles.description}>
          <View style={{ maxWidth: 250 }}>
            <Text style={styles.descriptionText}>
              Recession is coming — and a raft of companies will fail, warns
              elite investor...
            </Text>
          </View>
          <Image
            source={{ uri: "https://media.newsmonkey.be/musk--1692386892.jpg" }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.autherText}>Theron Mohamed</Text>
        </View>
      </View>
    </View>
  );
};
export default NewsCard;
