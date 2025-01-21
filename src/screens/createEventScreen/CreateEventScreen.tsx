// src/screens/CreateEventScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import * as ImagePicker from 'react-native-image-picker';
import InputField from '../../components/inputField/InputField';

// Types
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
  const [open, setOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Helper function to ensure valid Date
  const getValidDate = (date: Date | null): Date => date ?? new Date();

  const handleInputChange = (field: keyof CreateEventState, value: any) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      handleInputChange('eventMedia', result.assets[0].uri);
    }
  };

  const handlePublish = (): void => {
    console.log('Form State:', formState);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Event</Text>

      {/* Event Name */}
      <InputField
        label="Event Name"
        placeholder="Enter event name"
        value={formState.eventName}
        onChangeText={(text) => handleInputChange('eventName', text)}
      />

      {/* Ticket Price */}
      <InputField
        label="Ticket Price"
        placeholder="$0.00"
        value={formState.ticketPrice}
        onChangeText={(text) => handleInputChange('ticketPrice', text)}
        keyboardType="numeric"
      />

      {/* Event Date */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {formState.eventDate
              ? formState.eventDate.toDateString()
              : 'Select Date'}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
  <DatePicker
    modal
    open={showDatePicker}
    date={getValidDate(formState.eventDate)}
    onConfirm={(date) => {
      setShowDatePicker(false);
      handleInputChange('eventDate', date);
    }}
    onCancel={() => setShowDatePicker(false)}
  />
)}

      </View>

      {/* Event Type */}
      <InputField
        label="Event Type"
        placeholder="Select Type"
        value={formState.eventType}
        onChangeText={(text) => handleInputChange('eventType', text)}
      />

      {/* Event Location */}
      <InputField
        label="Event Location"
        placeholder="Enter location"
        value={formState.eventLocation}
        onChangeText={(text) => handleInputChange('eventLocation', text)}
      />

      {/* Google Maps URL */}
      <InputField
        label="Google Maps URL"
        placeholder="https://maps.google.com/xyz"
        value={formState.googleMapsUrl}
        onChangeText={(text) => handleInputChange('googleMapsUrl', text)}
      />

      {/* Event Media */}
      <View style={styles.mediaUploadContainer}>
        <Text style={styles.label}>Event Media</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {formState.eventMedia && (
          <Image
            source={{ uri: formState.eventMedia }}
            style={styles.previewImage}
          />
        )}
      </View>

      {/* Publish Button */}
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publish Event</Text>
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
    backgroundColor: '#6C63FF',
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
});

export default CreateEventScreen;
