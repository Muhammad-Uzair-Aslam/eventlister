// src/screens/CreateEventScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootState, AppDispatch } from '../../store/store';
import { createEvent } from '../../store/slices/EventSlice';
import InputField from '../../components/inputField/InputField';
import { Picker } from '@react-native-picker/picker';

export interface CreateEventState {
  eventName: string;
  ticketPrice: string;
  eventDate: Date | null;
  eventType: string;
  eventLocation: string;
  googleMapsUrl: string;
  eventMedia: string | null;
}

const CreateEventScreen: React.FC = () => {
  const [formState, setFormState] = useState<CreateEventState>({
    eventName: '',
    ticketPrice: '',
    eventDate: null,
    eventType: '',
    eventLocation: '',
    googleMapsUrl: '',
    eventMedia: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.event);

  const handleInputChange = (field: keyof CreateEventState, value: any) => {
    setFormState({ ...formState, [field]: value });
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
        handleInputChange('eventMedia', base64Url);
        Alert.alert('Success', 'Image selected successfully!');
      } else {
        Alert.alert('Error', 'No valid image data found.');
      }
    } else {
      Alert.alert('Error', 'No image selected.');
    }
  };

  const handlePublish = () => {
    if (
      !formState.eventName.trim() ||
      !formState.ticketPrice.trim() ||
      !formState.eventDate ||
      !formState.eventType ||
      !formState.eventLocation.trim() ||
      !formState.googleMapsUrl.trim() ||
      !formState.eventMedia
    ) {
      Alert.alert('Error', 'All fields are required. Please fill out all the details.');
      return;
    }
  
    dispatch(createEvent({ ...formState, eventDate: formState.eventDate.toISOString() }));
    setFormState({
      eventName: '',
      ticketPrice: '',
      eventDate: null,
      eventType: '',
      eventLocation: '',
      googleMapsUrl: '',
      eventMedia: null,
    });
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Event</Text>

      <InputField
        label="Event Name"
        placeholder="Enter event name"
        value={formState.eventName}
        onChangeText={(text) => handleInputChange('eventName', text)}
      />

      <InputField
        label="Ticket Price"
        placeholder="$0.00"
        value={formState.ticketPrice}
        onChangeText={(text) => handleInputChange('ticketPrice', text)}
        keyboardType="numeric"
      />

       <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setIsLoading(true)}
        >
          <Text style={styles.datePickerText}>
            {formState.eventDate
              ? formState.eventDate.toDateString()
              : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={isLoading}
          date={formState.eventDate || new Date()}
          onConfirm={(date) => {
            setIsLoading(false);
            handleInputChange('eventDate', date);
          }}
          onCancel={() => setIsLoading(false)}
        />
      </View>

      <View>
  <Text style={styles.label}>Event Type</Text>
  <Picker
    selectedValue={formState.eventType} // Use formState.eventType for selected value
    onValueChange={(itemValue) => handleInputChange('eventType', itemValue)} // Update the state on change
    style={styles.picker}
  >
    <Picker.Item label="Select Type" value="" />
    <Picker.Item label="Conference" value="conference" />
    <Picker.Item label="Workshop" value="workshop" />
    <Picker.Item label="Seminar" value="seminar" />
    <Picker.Item label="Webinar" value="webinar" />
  </Picker>
</View>


      <InputField
        label="Event Location"
        placeholder="Enter location"
        value={formState.eventLocation}
        onChangeText={(text) => handleInputChange('eventLocation', text)}
      />

      <InputField
        label="Google Maps URL"
        placeholder="https://maps.google.com/xyz"
        value={formState.googleMapsUrl}
        onChangeText={(text) => handleInputChange('googleMapsUrl', text)}
      />

      <View style={styles.mediaUploadContainer}>
        <Text style={styles.label}>Event Media</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={selectPhoto}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {formState.eventMedia && (
          <Image source={{ uri: formState.eventMedia }} style={styles.previewImage} />
        )}
      </View>

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>{loading ? 'Publishing...' : 'Publish Event'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerButton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  mediaUploadContainer: {
    marginBottom: 16,
  },
  uploadButton: {
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#666',
  },
  previewImage: {
    marginTop: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  publishButton: {
    height: 52,
    backgroundColor: '#6F3DE9',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default CreateEventScreen;
