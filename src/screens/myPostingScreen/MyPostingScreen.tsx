import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../store/slices/EventSlice';
import { AppDispatch, RootState } from '../../store/Store';
import SearchBar from '../../components/searchBar/SearchBar';
import RecentEventCard from '../../components/recenEventCard/RecentEventCard';

const MyPostingScreen = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();

  const { events, loading, error } = useSelector((state: RootState) => state.event);

  // Fetch events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <ScrollView>
      <Text style={styles.heading}>My Event Posting</Text>
      <View style={styles.eventPosting}>
        <SearchBar />
        {loading ? (
          <ActivityIndicator size="large" color="#6F3DE9" />
        ) : events.length > 0 ? (
          events.map((event) => (
            <RecentEventCard
              key={event.id} // Ensure each event has a unique ID
              category={event.eventType}
              imageUrl={event.eventMedia || 'https://via.placeholder.com/150'} // Default image if none exists
              title={event.eventName}
              price={event.ticketPrice ? `$${event.ticketPrice}` : 'Free'}
              date={event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'No Date'}
            />
          ))
        ) : (
          <Text style={styles.noEventsText}>No events to display</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MyPostingScreen;

const styles = StyleSheet.create({
  heading: {
    padding: 20,
    fontSize: 22,
    fontWeight: '600',
  },
  eventPosting: {
    padding: 20,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});
