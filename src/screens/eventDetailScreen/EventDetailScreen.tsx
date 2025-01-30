import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {EventDetailsScreenProps} from '../../types/authTypes';
import {useEventData} from '../../hooks/useEventData';
import {useTicketPurchase} from '../../hooks/useTicketPurchase';
import {useMapNavigation} from '../../hooks/useMapNavigation';
import {useEventNavigation} from '../../hooks/useEventNavigation';

const EventDetailScreen: React.FC<EventDetailsScreenProps> = ({route}) => {
  const {event} = route.params;
  const {eventData} = useEventData(event);
  const {handleBuyTicket} = useTicketPurchase();
  const {openMap} = useMapNavigation(eventData.mapUrl);
  const {goBack} = useEventNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Event Detail
        </Text>
        <Text></Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: eventData.image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.eventInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{eventData.title}</Text>
            <Text style={styles.price}>
              {eventData.price === 0 ? 'Free' : `$${eventData.price}`}
            </Text>
          </View>

          <View style={styles.participantsRow}>
            <Text style={styles.participants}><Text style={{fontWeight:600,color:'black'}}>182 </Text>Participant</Text>
            <Text style={styles.date}>•  {eventData.date}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description} numberOfLines={3}>
              Join us at {eventData.title} for fun, excitement, and
              unforgettable memories. Don't miss out – Grab your tickets now!
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>Read More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.organizerSection}>
            <View style={styles.organizerAvatar} />
            <Text style={styles.organizerName}>Jennifer Dane</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>Maps</Text>
            <View style={styles.googleMapContainer}>
              <TouchableOpacity style={styles.googleMapButton} onPress={openMap}>
                <Icon name="navigate-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Direct Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => handleBuyTicket(event)}>
          <Text style={styles.buyButtonText}>Buy Ticket</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 10,
    width: '92%',
    marginHorizontal: '4%',
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  eventInfo: {
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  googleMapContainer: {
    height: 120,
    backgroundColor: '#D1D5DB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171B2E',
  },
  price: {
    backgroundColor: '#EFF0F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '500',
    color: '#6F3DE9',
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  participants: {
    fontSize: 14,
    color: '#6B7280',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    color: '#6366F1',
    marginTop: 8,
  },
  organizerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  googleMapButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  buyButton: {
    backgroundColor: '#6F3DE9',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventDetailScreen;
