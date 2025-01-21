import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import CustomButton from '../../components/customButton/CustomButton';

interface ProfileData {
  name: string;
  email: string;
  profileImage: string | null;
}

const ProfileSettingsScreen: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Muhammad Talha',
    email: 'talhabytheway@techcloset.com',
    profileImage: null,
  });

  const handleImagePicker = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 1,
    };

    try {
      const response = await ImagePicker.launchImageLibrary(options);
      if (response.assets && response.assets.length > 0) {
        // setProfileData(prev => ({
        //   ...prev,
        //   profileImage: response.assets[0].uri
        // }));
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleUpdateProfile = () => {
    console.log('Profile Update:', profileData);
    // Add your profile update logic here
  };

  const handleResetPassword = () => {
    console.log('Reset Password Requested');
    // Add your password reset logic here
  };

  const handleLogout = () => {
    console.log('Logout Requested');
    // Add your logout logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image Section */}
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePicker}>
        {profileData.profileImage ? (<Text></Text>
        //   <Image
        //     source={{ uri: profileData.profileImage }}
        //     style={styles.profileImage}
        //   />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <View style={styles.editIconContainer}>
              {/* <Image
                source={require('../assets/home-icon.png')}
                style={styles.editIcon}
              /> */}
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
        {/* <InputField label='Name' placeholder='Enter your name' keyboardType={'default'} onChangeText={()=>{}}/> */}
        {/* <InputField label='Email' placeholder='Enter your email' keyboardType={'email-address'} onChangeText={()=>{}}/> */}

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, name: text }))}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, email: text }))}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <CustomButton title='Update Profile' onPress={handleUpdateProfile}/>
        <TouchableOpacity
          style={styles.resetPasswordButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.resetPasswordText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7C3AED',
    padding: 6,
    borderRadius: 12,
  },
  editIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFFFFF',
  },
  formContainer: {
    padding: 16,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 24,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetPasswordButton: {
    borderWidth: 1,
    borderColor: '#7C3AED',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  resetPasswordText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  addButton: {
    backgroundColor: '#7C3AED',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ProfileSettingsScreen;