import { Alert, Linking } from 'react-native';

export const useMapNavigation = (mapUrl: string) => {
  const openMap = () => {

    if (mapUrl) {
      Linking.openURL(mapUrl).catch((err) =>
        Alert.alert('Error', 'Failed to open the map URL. Please try again later.')
      );
    } else {
      Alert.alert('Map Not Available', 'No map URL provided for this event.');
    }
  };

  return { openMap };
};