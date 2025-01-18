import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'; // Correct import for MaterialIcons

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerflex}>
        <Text style={styles.header}>Recent Events</Text>
        <TouchableOpacity style={styles.icon}>
          <Icon name="filter" size={25} color={'#171B2E'} /> 
        </TouchableOpacity>
      </View>
      <View style={styles.inputField}>
        <View>
          <Icon size={25} name='search1' color={'#9496A5'}/>
        </View>
        <View>
        <TextInput
                style={styles.input}
                placeholder='Search...'
                value=''
                onChangeText={()=>{}}
                secureTextEntry={false}
                keyboardType='name-phone-pad'
              />
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  icon:{
    padding:7,
    borderWidth:1,
    borderColor:'#EFF0F9',
    borderRadius:25
  },
  headerflex: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute items to the left and right
    alignItems: 'center', // Vertically align them in the center
    paddingVertical: 20, // Add padding to the top as required
  },
  inputField:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center', 
    paddingVertical:10
  },
  input:{

  }
});

export default HomeScreen;
