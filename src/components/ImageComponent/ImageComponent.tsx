import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import GoogleImage from '../../assets/images/google.png'
const ImageComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={GoogleImage} // Replace with your image URL
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:'center',
    width:40,
    height:40,
    borderRadius:20,
    marginHorizontal:'auto',
    backgroundColor:'#92929230'
  },
  image: {
    width: 23, // Adjust image width
    height: 23, // Adjust image height
    resizeMode: 'contain', // Adjust image resizing behavior
  },
});

export default ImageComponent;
