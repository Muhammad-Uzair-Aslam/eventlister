import React from "react";
import { View, Text, Image, StyleSheet ,TouchableOpacity} from "react-native";



type CardProps = {
  category: string;
  imageUrl: string; 
  title: string;
  price: string;
  date: string;
  map?:string;
  location?:string | 'nofound'
  onPress: () => void; 
};

const RecentEventCard: React.FC<CardProps> = ({
  category,
  imageUrl,
  title,
  price,
  date,
  map,
  location,
  onPress
}) => {
  return (
    <TouchableOpacity  onPress={onPress}>
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
          <Text>{location}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: 12,
      shadowColor: "#B6C5CD", 
      shadowOffset: { width: 10, height: 15 }, 
      shadowOpacity: 0.8, 
      shadowRadius: 30,
      elevation: 25, 
      padding: 8,
      overflow: "hidden",
    },
    heading: {
      flexDirection: "row",
      justifyContent: "space-between", 
      alignItems: "center",
      width:'80%'
      
    },
    imageContainer: {
      width: 88,
      height: 88,
      borderRadius: 12,
      backgroundColor: "#D9D9D9", 
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
      width:50,
      fontSize: 12,
      color: "#6F3DE9",
      fontWeight: "500",
      textAlign:'center',
      paddingVertical: 4,
      backgroundColor: "#EFF0F9",
      borderRadius: 40, 
    },
  });
  

export default RecentEventCard;
