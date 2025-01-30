import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppDispatch, RootState } from '../store/Store';
import { fetchEvents } from '../store/slices/EventSlice';
import { CustomEvent } from '../types/authTypes';
type TabStackParamList = {
  MyPostingScreen: undefined;
  EditEvent: { event: CustomEvent };
};

type MyPostingScreenNavigationProp = NativeStackNavigationProp<
  TabStackParamList,
  'MyPostingScreen'
>;
export const useEventsFetching = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector((state: RootState) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return { events, loading, error };
};

export const useEventSearch = (events: CustomEvent[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<CustomEvent[]>(events);

  useEffect(() => {
    if (events) {
      const filtered = events?.filter((event) => {
        const searchString = searchTerm.toLowerCase();
        return (
          event?.eventName.toLowerCase().includes(searchString) ||
          event?.eventType.toLowerCase().includes(searchString) ||
          (event?.ticketPrice?.toString() || '').includes(searchString)
        );
      });
      setFilteredEvents(filtered);
    }
  }, [events, searchTerm]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  return {
    searchTerm,
    filteredEvents,
    handleSearch
  };
};

export const useEventNavigation = () => {
  const navigation = useNavigation<MyPostingScreenNavigationProp>();

  const handleCardPress = (event: CustomEvent) => {
    navigation.navigate('EditEvent', { event });
  };

  return { handleCardPress };
};