import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../../components/searchBar/SearchBar';
import RecentEventCard from '../../components/recenEventCard/RecentEventCard';
import {
  useEventsFetching,
  useEventSearch,
  useEventNavigation,
} from '../../hooks/usePostingHooks';

const MyPostingScreen = () => {
  const {events, loading, error} = useEventsFetching();
  const {searchTerm, filteredEvents, handleSearch} = useEventSearch(events);
  const {handleCardPress} = useEventNavigation();

  return (
    <ScrollView>
      <Text style={styles.heading}>My Event Posting</Text>
      <View style={styles.eventPosting}>
        <SearchBar
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#6F3DE9" />
        ) : filteredEvents?.length > 0 ? (
          filteredEvents?.map((event,index )=> (
            <RecentEventCard
              key={index}
              category={event?.eventType}
              imageUrl={event?.eventMedia || 'https://via.placeholder.com/150'}
              title={event?.eventName}
              price={event?.ticketPrice ? `$${event?.ticketPrice}` : 'Free'}
              date={
                event?.eventDate
                  ? new Date(event?.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'No Date'
              }
              onPress={() => handleCardPress(event)}
            />
          ))
        ) : (
          <Text style={styles.noEventsText}>
            {searchTerm
              ? 'No events found matching your search'
              : 'No events to display'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    padding: 20,
    fontSize: 22,
    fontWeight: '600',
  },
  eventPosting: {
    paddingHorizontal: 20,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});

export default MyPostingScreen;
