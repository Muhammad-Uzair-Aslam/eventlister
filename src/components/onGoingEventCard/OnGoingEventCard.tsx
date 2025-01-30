import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type CardProps = {
  category: string;
  imageUrl: string; 
  title: string;
  author?: string;
  price: string;
  date: string;
  map?:string;
  location?:string
};

const EventCard: React.FC<CardProps> = ({
  category,
  imageUrl,
  title,
  author,
  price,
  date,
  map,
  location
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}></View>
          <Text style={styles.authorText}>{author}</Text>
          <View style={styles.spacer}></View>
          <Text style={styles.price}>{price}</Text>
          <Text>{location}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#B6C5CD", 
        shadowOffset: { width: 10, height: 15 }, 
        shadowOpacity: 0.8,
        shadowRadius: 30, 
        elevation: 25, 
        overflow: "hidden",
        marginBottom: 16,
      },
    
  imageContainer: {
    position: "relative",
  },
  image: {
    height: 150,
    backgroundColor: "#D9D9D9",
    margin: 6,
    borderRadius: 12,
  },
  categoryContainer: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 40,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  authorAvatar: {
    width: 10,
    height: 10,
    backgroundColor: "#999",
    borderRadius: 5,
    marginRight: 8,
  },
  authorText: {
    fontSize: 14,
    color: "#555",
  },
  spacer: {
    flex: 1,
  },
  price: {
    fontSize: 12,
    color: "#6F3DE9",
    fontWeight: "500",
    textAlign: "center",
    width:50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#EFF0F9",
    borderRadius: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  date: {
    fontSize: 12,
    color: "#999",
    paddingVertical: 5,
  },
});

export default EventCard;
