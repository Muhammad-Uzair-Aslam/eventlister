import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { AppDispatch } from '../store/Store';
import { buyTicket, fetchUserTickets } from '../store/slices/EventSlice';
import { EventDetailProps } from '../types/authTypes';

export const useTicketPurchase = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleBuyTicket = (event: EventDetailProps) => {
    dispatch(buyTicket(event as Required<EventDetailProps>)).then(() => {
      Alert.alert('Success', 'Your ticket has been purchased successfully!');
      dispatch(fetchUserTickets()); 
    }
).catch(()=>{Alert.alert("no ticket purchased")});
  };

  return { handleBuyTicket };
};