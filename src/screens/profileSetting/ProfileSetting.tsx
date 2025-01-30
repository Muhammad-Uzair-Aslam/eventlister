import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import CustomButton from '../../components/customButton/CustomButton';
import {
  useProfileData,
  useImagePicker,
  useProfileActions,
} from '../../hooks/useProfileSetting';

const ProfileSettingsScreen: React.FC = () => {
  const {profileData, selectedImage, setSelectedImage, updateProfileData} =
    useProfileData();
  const {handleImagePicker} = useImagePicker();
  const {handleUpdateProfile, handleResetPassword, handleLogout} =
    useProfileActions();

  const onImageSelect = async () => {
    const imageUri = await handleImagePicker();
    if (imageUri) {
      setSelectedImage(imageUri);
    }
  };

  const onUpdateProfile = async () => {
    await handleUpdateProfile(profileData.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text></Text>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={onImageSelect}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.placeholderText}>
              {profileData.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={text => updateProfileData(text)}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            editable={false}
            placeholder="Enter your email"
          />
        </View>

        <CustomButton title="Update Profile" onPress={onUpdateProfile} />
        <TouchableOpacity
          style={styles.resetPasswordButton}
          onPress={handleResetPassword}>
          <Text style={styles.resetPasswordText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    paddingLeft: 50,
    fontWeight: '600',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#6F3DE9',
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
    backgroundColor: '#1d2aaa',
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
    marginVertical: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 28,
    padding: 12,
    fontSize: 16,
  },
  resetPasswordButton: {
    borderWidth: 1,
    borderColor: '#6F3DE9',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  resetPasswordText: {
    color: '#6F3DE9',
    fontSize: 16,
    fontWeight: '600',
  },
  placeholderText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
