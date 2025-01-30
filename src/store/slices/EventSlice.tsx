import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {CustomEvent} from '../../types/authTypes';
import {initialState} from '../../types/authTypes';

export const isEventOngoing = (eventDateString: string) => {
  try {
    const eventDate = new Date(eventDateString);
    const currentDate = new Date();

    return (
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getDate() === currentDate.getDate()
    );
  } catch (error) {
    return false;
  }
};
export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData:  any, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User is not logged in');
      }
      const eventWithUserId = {
        ...eventData,
        userId: currentUser.uid,
        eventDate: new Date(eventData.eventDate).toISOString(),
        createdAt: new Date().toISOString(),
      };

      await firestore().collection('Events').add(eventWithUserId);
      return eventWithUserId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async (eventData: CustomEvent, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User is not logged in');
      }
      if (!eventData.id) {
        throw new Error('Event ID is required for update');
      }
      await firestore().collection('Events').doc(eventData.id).update({
        eventName: eventData.eventName,
        eventType: eventData.eventType,
        eventDate: eventData.eventDate,
        ticketPrice: eventData.ticketPrice,
        eventMedia: eventData.eventMedia,
        googleMapsUrl: eventData.googleMapsUrl,
        eventLocation: eventData.eventLocation,
      });

      return eventData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
export const buyTicket = createAsyncThunk(
  'event/buyTicket',
  async (eventData: CustomEvent, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User is not logged in');
      }
      const ticket = {
        userId: currentUser.uid,
        eventId: eventData.id,
        eventMedia: eventData.eventMedia,
        eventName: eventData.eventName,
        eventType: eventData.eventType,
        price: eventData.ticketPrice,
        eventLocation: eventData.eventLocation,
        eventDate: eventData.eventDate,
      };
      await firestore().collection('Tickets').add(ticket);

      return ticket;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
export const fetchUserTickets = createAsyncThunk(
  'event/fetchUserTickets',
  async (_, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      const snapshot = await firestore()
        .collection('Tickets')
        .where('userId', '==', currentUser.uid)
        .get();

      const tickets: CustomEvent[] = snapshot.docs?.map(doc => ({
        id: doc?.id,
        eventName: doc?.data().eventName,
        eventType: doc?.data().eventType,
        eventDate: doc?.data().eventDate,
        eventMedia: doc?.data().eventMedia,
        eventLocation: doc?.data().eventLocation,
        eventPrice:doc?.data().ticketPrice,
      }));

      return tickets;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const fetchAllEvents = createAsyncThunk(
  'event/fetchAllEvents',
  async (_, {rejectWithValue}) => {
    try {
      const snapshot = await firestore().collection('Events').get();

      const events = snapshot.docs?.map(doc => ({
        id: doc?.id,
        ...doc.data(),
      })) as CustomEvent[];
      const currentDate = new Date();
      const ongoingEvents = events?.filter(event =>
        isEventOngoing(event?.eventDate),
      );

      const otherEvents = events?.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate;
      });
      return {events, ongoingEvents, otherEvents};
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
export const fetchEvents = createAsyncThunk(
  'event/fetchEvents',
  async (_, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      const snapshot = await firestore()
        .collection('Events')
        .where('userId', '==', currentUser.uid)
        .get();

      const events = snapshot.docs?.map(doc => {
        const data = doc?.data();
        return {
          id: doc?.id,
          eventName: data?.eventName,
          eventType: data?.eventType,
          eventDate: data?.eventDate,
          ticketPrice: data?.ticketPrice,
          eventMedia: data?.eventMedia,
          userId: data?.userId,
          eventLocation: data?.eventLocation,
          googleMapsUrl: data?.googleMapsUrl,
        } as CustomEvent;
      });

      return events;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createEvent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<CustomEvent>) => {
          state.loading = false;
          state.events.push(action.payload);
        },
      )
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllEvents.fulfilled,
        (
          state,
          action: PayloadAction<{
            events: CustomEvent[];
            ongoingEvents: CustomEvent[];
            otherEvents: CustomEvent[];
          }>,
        ) => {
          state.loading = false;
          state.events = action.payload.events;
          state.ongoingEvents = action.payload.ongoingEvents;
          state.otherEvents = action.payload.otherEvents;
        },
      )

      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEvents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<CustomEvent[]>) => {
          state.loading = false;
          state.events = action.payload;
        },
      )

      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateEvent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTickets.fulfilled, (state, action) => {
        state.userTickets = action.payload;
      })
      .addCase(fetchUserTickets.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        updateEvent.fulfilled,
        (state, action: PayloadAction<CustomEvent>) => {
          state.loading = false;
          const index = state.events.findIndex(
            event => event.id === action.payload.id,
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        },
      )
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventSlice.reducer;
