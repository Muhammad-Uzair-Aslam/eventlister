import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppDispatch} from '../../store/Store';
import {updateEvent} from '../../store/slices/EventSlice';
import InputField from '../../components/inputField/InputField';
import {Picker} from '@react-native-picker/picker';
import {EditEventProps} from '../../types/authTypes';
import useFormState from '../../hooks/useFormState';
import useDatePicker from '../../hooks/useDatePicker';
import useImagePicker from '../../hooks/useImagePicker';

const EditEventScreen: React.FC<EditEventProps> = ({route, navigation}) => {
  const {event} = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const {formState, handleInputChange} = useFormState({
    id: event.id,
    eventName: event.eventName || '',
    eventType: event.eventType || '',
    eventDate: event.eventDate ? new Date(event.eventDate) : new Date(),
    ticketPrice: event.ticketPrice?.toString() || '',
    eventMedia: event.eventMedia || null,
    googleMapsUrl: event.googleMapsUrl || '',
    eventLocation: event.eventLocation || '',
  });

  const {
    isDatePickerOpen,
    eventDate,
    openDatePicker,
    closeDatePicker,
    onConfirmDate,
  } = useDatePicker(formState.eventDate);

  const {selectPhoto} = useImagePicker();

  const handleUpdate = () => {
    if (
      !formState.eventName ||
      !formState.eventType ||
      !formState.eventLocation
    ) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const updatedEvent = {
      ...formState,
      eventDate: eventDate.toISOString(),
      eventMedia: formState.eventMedia || undefined,
    };

    dispatch(updateEvent(updatedEvent));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Event</Text>

      <InputField
        label="Event Name"
        value={formState.eventName}
        onChangeText={text => handleInputChange('eventName', text)}
      />

      <InputField
        label="Ticket Price"
        value={formState.ticketPrice}
        onChangeText={text => handleInputChange('ticketPrice', text)}
        keyboardType="numeric"
      />

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={openDatePicker}>
          <Text>{eventDate.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={isDatePickerOpen}
          date={eventDate}
          onConfirm={onConfirmDate}
          onCancel={closeDatePicker}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Event Type</Text>
        <View style={styles.type}>
          <Picker
            selectedValue={formState.eventType}
            onValueChange={itemValue =>
              handleInputChange('eventType', itemValue)
            }>
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Conference" value="conference" />
            <Picker.Item label="Workshop" value="workshop" />
            <Picker.Item label="Seminar" value="seminar" />
            <Picker.Item label="Webinar" value="webinar" />
          </Picker>
        </View>
      </View>

      <InputField
        label="Event Location"
        value={formState.eventLocation}
        onChangeText={text => handleInputChange('eventLocation', text)}
      />

      <InputField
        label="Google Maps URL"
        value={formState.googleMapsUrl}
        onChangeText={text => handleInputChange('googleMapsUrl', text)}
      />

      <View style={styles.mediaUploadContainer}>
        <Text style={styles.label}>Event Media</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => selectPhoto(handleInputChange)}>
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

      <TouchableOpacity style={styles.publishButton} onPress={handleUpdate}>
        <Text style={styles.publishButtonText}>Update Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  container: {flex: 1, padding: 20, backgroundColor: 'white'},
  icons: {justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateContainer: {marginBottom: 15},
  label: {fontSize: 16, marginBottom: 10},
  datePickerButton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  pickerContainer: {marginBottom: 15},
  type: {backgroundColor: '#F9F9F9', borderRadius: 28, marginVertical: 5},
  publishButton: {
    height: 52,
    backgroundColor: '#6F3DE9',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  publishButtonText: {fontSize: 16, fontWeight: '600', color: '#FFF'},
});

export default EditEventScreen;
