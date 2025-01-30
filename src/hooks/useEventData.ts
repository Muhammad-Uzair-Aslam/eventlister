import { EventDetailProps } from '../types/authTypes';

export const useEventData = (event: EventDetailProps) => {
  const eventData = {
    title: event.eventName || event.title || 'Untitled Event',
    price: event.ticketPrice || event.price || 0,
    type: event.eventType || 'Event Type Not Specified',
    date: new Date(event.eventDate || event.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    description: event.description || 'No description available',
    image: event.eventMedia || event.imageUrl || 'https://via.placeholder.com/350',
    mapUrl: event.googleMapsUrl || '',
    location: event.eventLocation || 'Location not specified',
  };

  return { eventData };
};
