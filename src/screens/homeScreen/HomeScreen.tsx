import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import EventCard from '../../components/onGoingEventCard/OnGoingEventCard';
import RecentEventCard from '../../components/recenEventCard/RecentEventCard';
import SearchBar from '../../components/searchBar/SearchBar';
import SortingModal from '../../components/sortingModal/SortingModal';
import TabNavigator from '../../navigation/TabNavigator';

const HomeScreen: React.FC = () => {
  const [data, setData] = useState<string[]>([]); // Example data
  const [filteredData, setFilteredData] = useState<string[]>(data);
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerflex}>
        <Text style={styles.header}>Recent Events</Text>
        <TouchableOpacity style={styles.icon} onPress={() => setIsVisible(true)}>
          <Icon name="filter" size={25} color={'#171B2E'} />
        </TouchableOpacity>
      </View>
      <SearchBar placeholder="Search..." onSearch={handleSearch} />
      <View>
        <View style={styles.headingFlex}>
          <Text style={styles.ongoing}>OnGoing Events</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <EventCard
          category="Concert"
          imageUrl="https://via.placeholder.com/150" // Replace with a valid URL
          title="Radiohead Concert"
          author="Jenifer Dane"
          price="$483"
          date="22 Oct, 2022"
        />
      </View>
      <View style={styles.headingFlex}>
        <Text style={styles.ongoing}>Other Events</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      {/* <SortingModal isVisible={isVisible} onClose={() => setIsVisible(false)} /> */}
      
    </ScrollView>
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
  ongoing: {
    fontSize: 18,
    fontWeight: 600,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: 500,
    color: '#6F3DE9',
  },
  headingFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  icon: {
    padding: 7,
    borderWidth: 1,
    borderColor: '#EFF0F9',
    borderRadius: 25,
  },
  headerflex: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute items to the left and right
    alignItems: 'center', // Vertically align them in the center
    paddingVertical: 20, // Add padding to the top as required
  },
});

export default HomeScreen;
