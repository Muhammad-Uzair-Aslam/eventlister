import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Slider } from '@miblanchard/react-native-slider';
import { useNavigation } from '@react-navigation/native';
import { CustomEvent } from '../../types/authTypes';
import SearchBar from '../../components/searchBar/SearchBar';
import EventCard from '../../components/onGoingEventCard/OnGoingEventCard';
import RecentEventCard from '../../components/recenEventCard/RecentEventCard';
import Icon from 'react-native-vector-icons/Feather';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import { Picker } from '@react-native-picker/picker';
import { useEvents, useEventSearch, useEventFilter, useEventDisplay } from '../../hooks/useHomeScreenHooks';
import { NavigationProp } from '../../types/authTypes';


const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { ongoingEvents, otherEvents, loading, error } = useEvents();
  const { searchTerm, filteredOngoingEvents, filteredOtherEvents, handleSearch } = 
    useEventSearch(ongoingEvents, otherEvents);
  const {
    isFilterModalVisible,
    priceRange,
    dateRange,
    category,
    toggleFilterModal,
    handlePriceRangeChange,
    setDateRange,
    setCategory,
    handleFilterSubmit
  } = useEventFilter(ongoingEvents, otherEvents);
  const { showAllOngoing, showAllOther, toggleShowAllOngoing, toggleShowAllOther } = 
    useEventDisplay();

  const handleEventPress = (event: CustomEvent) => {
    navigation.navigate('EventDetails', { event });
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#6F3DE9" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <>

      <ScrollView style={styles.container}>
        <View style={styles.headerflex}>
          <Text style={styles.header}>Recent Events</Text>
          <View style={styles.filterIcon}>
            <TouchableOpacity onPress={toggleFilterModal}>
              <Icon size={20} color="black" name="filter" />
            </TouchableOpacity>
          </View>
        </View>

        <SearchBar
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        <View>
          <View style={styles.headingFlex}>
            <Text style={styles.ongoing}>OnGoing Events</Text>
            <TouchableOpacity onPress={toggleShowAllOngoing}>
              <Text style={styles.seeAllText}>
                {showAllOngoing ? 'Show less' : 'See all'}
              </Text>
            </TouchableOpacity>
          </View>
          {filteredOngoingEvents.length > 0 ? (
            filteredOngoingEvents?.slice(0, showAllOngoing ? filteredOngoingEvents.length : 1)?.map((event) => (
                <TouchableOpacity key={event?.id} onPress={() => handleEventPress(event)}>
                  <EventCard
                    author="Danny Morison"
                    category={event?.eventType}
                    imageUrl={event?.eventMedia || 'https://via.placeholder.com/150'}
                    title={event?.eventName}
                    price={event?.ticketPrice ? `$${event.ticketPrice}` : 'Free'}
                    date={new Date(event?.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  />
                </TouchableOpacity>
              ))
          ) : (
            <Text style={styles.noEventsText}>No ongoing events</Text>
          )}
        </View>
        <View style={styles.headingFlex}>
          <Text style={styles.ongoing}>Other Events</Text>
          <TouchableOpacity onPress={toggleShowAllOther}>
            <Text style={styles.seeAllText}>
              {showAllOther ? 'Show less' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>
        {filteredOtherEvents?.length > 0 ? (
          filteredOtherEvents?.slice(0, showAllOther ? filteredOtherEvents.length : 3)?.map((event) => (
              <View key={event?.id}>
                <RecentEventCard
                  onPress={() => handleEventPress(event)}
                  category={event?.eventType}
                  imageUrl={event?.eventMedia || 'https://via.placeholder.com/150'}
                  title={event?.eventName}
                  price={event?.ticketPrice ? `$${event?.ticketPrice}` : 'Free'}
                  date={new Date(event?.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
              </View>
            ))
        ) : (
          <Text style={styles.noEventsText}>No other events</Text>
        )}
      </ScrollView>
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={toggleFilterModal}
        swipeDirection="down"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={toggleFilterModal}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            minimumValue={0}
            maximumValue={5000}
            step={50}
            minimumTrackTintColor="#6F3DE9"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#6F3DE9"
          />
          <View style={styles.rangeValues}>
            <Text>${priceRange[0]}</Text>
            <Text>${priceRange[1]}</Text>
          </View>
          <View style={{paddingTop:25}}>
          <InputField
            label="Sort by Date"
            placeholder="Select date range"
            value={dateRange}
            onChangeText={setDateRange}
          />
          </View>
          <Text style={styles.sectionTitle}>Sort by Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Conference" value="conference" />
              <Picker.Item label="Workshop" value="workshop" />
              <Picker.Item label="Seminar" value="seminar" />
              <Picker.Item label="Webinar" value="webinar" />
              <Picker.Item label="Technology" value="technology" />
              <Picker.Item label="Health" value="health" />
              <Picker.Item label="Education" value="education" />
              <Picker.Item label="Travel" value="travel" />
              <Picker.Item label="Food" value="food" />
            </Picker>
          </View>
          <CustomButton title="Show Results" onPress={handleFilterSubmit} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
    headerflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterIcon:{
    borderWidth:1,
    borderColor:'#D9D9D9',
    padding:7,
    borderRadius:20
  },
  ongoing: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  seeAllText: {
    color: '#6F3DE9',
  },
  noEventsText: {
    textAlign: 'center',
    color: 'gray',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  headingFlex: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetText: {
    color: '#6F3DE9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  rangeValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    marginTop:10,
    borderRadius: 28,
    borderColor: '#ccc',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default HomeScreen;
