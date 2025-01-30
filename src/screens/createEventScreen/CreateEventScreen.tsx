import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import InputField from '../../components/inputField/InputField';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMediaAndDate} from '../../hooks/useMediaDate';
import {useEventForm} from '../../hooks/useCreateEvent';
import {useEventHandler} from '../../hooks/useEventHandler';

const CreateEventScreen: React.FC = () => {
  const {formState, handleInputChange, validateForm, resetForm} =
    useEventForm();

  const {
    isDatePickerOpen,
    setIsDatePickerOpen,
    handleDateConfirm,
    handleDateCancel,
    selectPhoto,
  } = useMediaAndDate({
    onDateChange: date => handleInputChange('eventDate', date),
    onMediaChange: media => handleInputChange('eventMedia', media),
  });

  const {loading, handlePublish} = useEventHandler(
    validateForm,
    resetForm,
    formState,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Event</Text>

      <InputField
        label="Event Name"
        placeholder="Enter event name"
        value={formState.eventName}
        onChangeText={text => handleInputChange('eventName', text)}
      />

      <InputField
        label="Ticket Price"
        placeholder="$0.00"
        value={formState.ticketPrice}
        onChangeText={text => handleInputChange('ticketPrice', text)}
        keyboardType="numeric"
      />

      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setIsDatePickerOpen(true)}
          accessibilityLabel="Select event date">
          <Text style={styles.datePickerText}>
            {formState.eventDate
              ? formState.eventDate.toDateString()
              : 'Select Date'}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={isDatePickerOpen}
          date={formState.eventDate || new Date()}
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />
      </View>

      <View>
        <Text style={styles.label}>Event Type</Text>
        <View style={styles.type}>
          <Picker
            selectedValue={formState.eventType}
            onValueChange={itemValue =>
              handleInputChange('eventType', itemValue)
            }
            style={styles.picker}>
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Conference" value="conference" />
            <Picker.Item label="Workshop" value="workshop" />
            <Picker.Item label="Seminar" value="seminar" />
            <Picker.Item label="Webinar" value="webinar" />
            <Picker.Item label="Technology" value="technology" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="Education" value="education" />
            <Picker.Item label="Travel" value="travel" />
            <Picker.Item label="Food" value="food" />
          </Picker>
        </View>
      </View>

      <InputField
        label="Event Location"
        placeholder="Enter location"
        value={formState.eventLocation}
        onChangeText={text => handleInputChange('eventLocation', text)}
      />

      <InputField
        label="Google Maps URL"
        placeholder="https://maps.google.com/xyz"
        value={formState.googleMapsUrl}
        onChangeText={text => handleInputChange('googleMapsUrl', text)}
      />

      <View style={styles.mediaUploadContainer}>
        <Text style={styles.label}>Event Media</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={selectPhoto}>
          {formState.eventMedia ? (
            <Image
              source={{uri: formState.eventMedia}}
              style={styles.previewImage}
            />
          ) : (
            <View style={styles.icons}>
              <Icon name="briefcase-upload" size={50} color="black" />
              <Text>Upload image</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>
          {loading ? 'Publishing...' : 'Publish Event'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flexGrow: 1, padding: 20, backgroundColor: '#FFF'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#333'},
  datePickerContainer: {marginBottom: 16},
  datePickerButton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  datePickerText: {fontSize: 16, color: '#333'},
  mediaUploadContainer: {marginBottom: 16},
  uploadButton: {
    height: 150,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  previewImage: {marginTop: 8, width: 100, height: 100, borderRadius: 8},
  publishButton: {
    height: 52,
    backgroundColor: '#6F3DE9',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  icons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButtonText: {fontSize: 16, fontWeight: '600', color: '#FFF'},
  picker: {
    width: '100%',
  },
  type: {
    backgroundColor: '#F9F9F9',
    borderRadius: 28,
    marginVertical: 5,
  },
});

export default CreateEventScreen;
