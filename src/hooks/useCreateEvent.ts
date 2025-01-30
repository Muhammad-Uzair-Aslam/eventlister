import { useState } from 'react';
import { Alert } from 'react-native';
import {CreateEventState} from '../types/authTypes'


export const useEventForm = () => {
  const [formState, setFormState] = useState<CreateEventState>({
    eventName: '',
    ticketPrice: '',
    eventDate: null,
    eventType: '',
    eventLocation: '',
    googleMapsUrl: '',
    eventMedia: null,
  });

  const handleInputChange = <K extends keyof CreateEventState>(
    field: K,
    value: CreateEventState[K]
  ) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (formState.eventName.trim().length < 3) {
      Alert.alert('Error', 'Event name must be at least 3 characters long.');
      return false;
    }

    if (!formState.ticketPrice.trim()) {
      Alert.alert('Error', 'Ticket price is required.');
      return false;
    }

    if (!formState.eventDate) {
      Alert.alert('Error', 'Please select a valid event date.');
      return false;
    }

    if (!formState.eventType) {
      Alert.alert('Error', 'Please select an event type.');
      return false;
    }

    if (!formState.eventLocation.trim()) {
      Alert.alert('Error', 'Event location is required.');
      return false;
    }

    if (!formState.googleMapsUrl.match(/^http\:\/\/|https\:\/\/|www\.google$/)) {
      Alert.alert('Error', 'Please enter a valid Google Maps URL.');
      return false;
    }

    if (!formState.eventMedia) {
      Alert.alert('Error', 'Please upload an event media image.');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormState({
      eventName: '',
      ticketPrice: '',
      eventDate: null,
      eventType: '',
      eventLocation: '',
      googleMapsUrl: '',
      eventMedia: null,
    });
  };

  return {
    formState,
    handleInputChange,
    validateForm,
    resetForm,
  };
};