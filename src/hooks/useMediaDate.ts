import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';

interface MediaAndDateProps {
  onDateChange: (date: Date) => void;
  onMediaChange: (media: string) => void;
}

export const useMediaAndDate = ({ onDateChange, onMediaChange }: MediaAndDateProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setIsDatePickerOpen(false);
    onDateChange(date); 
  };

  const handleDateCancel = () => {
    setIsDatePickerOpen(false);
  };

  const selectPhoto = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });

    if (response.assets && response.assets.length > 0) {
      const imageBase64 = response.assets[0].base64;
      if (imageBase64) {
        const base64Url = `data:image/jpeg;base64,${imageBase64}`;
        onMediaChange(base64Url); 
        Alert.alert('Success', 'Image selected successfully!');
      } else {
        Alert.alert('Error', 'No valid image data found.');
      }
    } else {
      Alert.alert('Error', 'No image selected.');
    }
  };

  return {
    isDatePickerOpen,
    setIsDatePickerOpen,
    handleDateConfirm,
    handleDateCancel,
    selectPhoto,
  };
};