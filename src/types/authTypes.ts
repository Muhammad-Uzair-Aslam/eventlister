import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;
export type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList & RootStackParamList, 'SignUp'>;

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export type CustomEvent = {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  ticketPrice?: string|number;
  eventMedia?: string;
  userId?: string;
  googleMapsUrl?: string;
  eventLocation?: string;
  startTime?: string;  
  endTime?: string; 
};

export type eventState = {
  events: CustomEvent[];
  ongoingEvents: CustomEvent[];
  otherEvents: CustomEvent[];
  userTickets: CustomEvent[];
  loading: boolean;
  error: string | null;
};

export const initialState: eventState = {
  events: [],
  ongoingEvents: [],
  otherEvents: [],
  userTickets: [],
  loading: false,
  error: null,
};

export type NavigationProp = {
  navigate: (screen: string, params?: { event: CustomEvent }) => void;
};

export type UseSignUpFormReturn = {
  formData: SignUpFormData;
  status: string;
  error: string | null;
  handleSignUp: () => void;
  handleInputChange: (name: keyof SignUpFormData, value: string) => void;
};

export type SignInScreenProps = NativeStackScreenProps<AuthStackParamList & RootStackParamList, 'SignIn'>;

export type AuthFormState = {
  email: string;
  password: string;
};

export type UseAuthFormReturn = {
  email: string;
  password: string;
  status: string;
  error: string | null;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSignIn: () => void;
};

export type AuthScreenParams = {
  Splash: Record<string, never>;  
  SignIn: undefined;
  SignUp: {
    initialEmail?: string;
  };
  ResetPassword: {
    token: string;
    email: string;
  };
};

export type CreateEventState = {
  eventName: string;
  ticketPrice: string;
  eventDate: Date | null;
  eventType: string;
  eventLocation: string;
  googleMapsUrl: string;
  eventMedia: string | null;
};

export type Event = {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  ticketPrice?: string;
  eventMedia?: string;
  googleMapsUrl?: string;
  eventLocation: string;
};

export type AuthStackParamList = {
  Splash: {};
  SignIn: undefined;
  SignUp: {
    referralCode?: string;
  };
  RecoverPassword: {
    email?: string;
  };
  ResetPassword: {
    token: string;
  };
  MainApp: {};
};

export type RootStackParamList = {
  TabNavigator: undefined;  
  ResetPassword: { password?: string };
  Auth: undefined;
  MainApp: { params?: {} };
  EditEvent: { 
    event: {
      id: string;
      eventName?: string;
      eventType?: string;
      eventDate?: string;
      ticketPrice?: string;
      eventMedia?: string;
      googleMapsUrl?: string;
      eventLocation?: string;
    }
  };
  ticketDetails: {
    event: {
      eventName?: string;
      title?: string;
      ticketPrice?: number;
      price?: number;
      eventType?: string;
      eventDate?: string;
      date?: string;
      description?: string;
      eventMedia?: string;
      imageUrl?: string;
      GoogleMapUrl?: string;
      location?: string;
    };
  };
  EventDetails: {
    event: {
      eventName?: string;
      title?: string;
      ticketPrice?: number;
      price?: number;
      eventType?: string;
      eventDate?: string;
      date?: string;
      description?: string;
      eventMedia?: string;
      imageUrl?: string;
      GoogleMapUrl?: string;
    };
  };
};

export type TabStackParamList = {
  recoverPassword: undefined;
  Home: undefined;
  MyPosting: undefined;
  CreateEvent: undefined;
  TicketDetail: {
    event: null;
  };
  ProfileSetting: undefined;
};

export type TicketDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ticketDetails'>;
};

type EditEventScreenRouteProp = RouteProp<RootStackParamList, 'EditEvent'>;
type EditEventScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditEvent'>;

export type EditEventProps = {
  route: EditEventScreenRouteProp;
  navigation: EditEventScreenNavigationProp;
};

export type EventState = {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: Date;
  ticketPrice: string;
  eventMedia: string | null;
  googleMapsUrl: string;
  eventLocation: string;
};

export type EventDetailProps = {
  id?: string;
  eventName?: string;
  title?: string;
  price?: number;
  ticketPrice?: number;
  eventType?: string;
  eventDate?: string;
  date?: string;
  description?: string;
  eventMedia?: string;
  imageUrl?: string;
  googleMapsUrl?: string;
  eventLocation?: string;
};

export type RootStack = {
  EventDetails: { event: EventDetailProps };
};

export type EventDetailsScreenProps = {
  route: RouteProp<RootStack, 'EventDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'EventDetails'>;
};