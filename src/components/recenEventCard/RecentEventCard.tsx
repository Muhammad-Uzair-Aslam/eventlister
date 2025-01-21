import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type CardProps = {
  category: string;
  imageUrl: string; // Replace this with a valid image URL
  title: string;
  price: string;
  date: string;
};

const RecentEventCard: React.FC<CardProps> = ({
  category,
  imageUrl,
  title,
  price,
  date,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View>
        <View style={styles.heading}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.price}>{price}</Text>

        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 12,
      shadowColor: "#B6C5CD", // Custom shadow color
      shadowOffset: { width: 10, height: 15 }, // Deeper vertical shadow
      shadowOpacity: 0.8, // High opacity for visible shadow
      shadowRadius: 30, // Very large blur spread
      elevation: 25, // Higher elevation for Android
      padding: 8,
      overflow: "hidden",
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between", // Changed from space-evenly to space-between
      alignItems: "center",
      width:'80%'
      
    },
    imageContainer: {
      width: 88,
      height: 88,
      borderRadius: 12,
      backgroundColor: "#D9D9D9", // Placeholder color
      overflow: "hidden",
      marginRight: 12,
    },
    image: {
      width: "100%",
      height: "100%",
    },
   
    category: {
      fontSize: 12,
      fontWeight: "500",
      color: "#999",
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
    },
    date: {
      fontSize: 12,
      color: "#999",
    },
    price: {
      fontSize: 12,
      color: "#6F3DE9",
      fontWeight: "500",
      paddingHorizontal: 10,
      paddingVertical: 6,
      backgroundColor: "#EFF0F9",
      borderRadius: 40, // Light purple for the price
    },
  });
  

export default RecentEventCard;
