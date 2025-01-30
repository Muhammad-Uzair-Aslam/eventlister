import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { GoogleImage } from '../../assets/svgs';
const ImageComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={GoogleImage} 
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
    width: 23,
    height: 23, 
    resizeMode: 'contain', 
  },
});

export default ImageComponent;
