import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import { AppDispatch } from '../store/store';
import { signOutUser } from '../store/slices/AuthSlice';
import { AuthStackParamList } from '../types/authTypes';

interface ProfileData {
  name: string;
  email: string;
  profileImage: string | null;
}

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    profileImage: null,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const extractNameFromEmail = (email: string): string => {
    const namePart = email.split('@')[0];
    return namePart?.split('.')?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    
    if (currentUser && currentUser.email) {
      const extractedName = extractNameFromEmail(currentUser.email);
      
      setProfileData({
        name: extractedName,
        email: currentUser.email,
        profileImage: currentUser.photoURL || null
      });

      if (currentUser.photoURL) {
        setSelectedImage(currentUser.photoURL);
      }
    }
  }, []);

  const updateProfileData = (name: string) => {
    setProfileData(prev => ({ ...prev, name }));
  };

  return {
    profileData,
    selectedImage,
    setSelectedImage,
    updateProfileData
  };
};

export const useImagePicker = () => {
  const handleImagePicker = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 1,
    };

    try {
      const response = await ImagePicker.launchImageLibrary(options);
      if (response.assets && response.assets.length > 0) {
        return response.assets[0].uri;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return { handleImagePicker };
};

export const useProfileActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleUpdateProfile = async (name: string) => {
    try {
      const currentUser = auth().currentUser;
      
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: name
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword', { token: '' });
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleUpdateProfile,
    handleResetPassword,
    handleLogout
  };
};