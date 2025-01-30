import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createEvent } from '../store/slices/EventSlice';
import { Alert } from 'react-native';
import { CreateEventState } from '../types/authTypes'; 

export const useEventHandler = (
  validateForm: () => boolean,
  resetForm: () => void,
  formState: CreateEventState
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.event);

  const handlePublish = () => {
    if (validateForm()) {
      dispatch(createEvent({ 
        ...formState, 
        eventDate: formState.eventDate ? formState.eventDate.toISOString() : null 
      }));
      Alert.alert('Success', 'Event created successfully!');
      resetForm();
    }
  };

  return {
    loading,
    handlePublish,
  };
};
