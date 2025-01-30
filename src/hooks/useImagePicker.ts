import {launchImageLibrary} from 'react-native-image-picker';

const useImagePicker = () => {
  const selectPhoto = async (
    handleInputChange: (field: string, value: string | null) => void,
  ) => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });

    if (response.assets && response.assets.length > 0) {
      const imageBase64 = response.assets[0].base64;
      if (imageBase64) {
        const base64Url = `data:image/jpeg;base64,${imageBase64}`;
        handleInputChange('eventMedia', base64Url);
      }
    }
  };

  return {selectPhoto};
};

export default useImagePicker;
