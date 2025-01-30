import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {AppDispatch} from '../../store/Store';
import {fetchUserTickets} from '../../store/slices/EventSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import Icon from 'react-native-vector-icons/Ionicons';
import {TicketDetailScreenProps} from '../../types/authTypes';

const TicketDetailScreen: React.FC<TicketDetailScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userTickets = useSelector(
    (state: RootState) => state.event.userTickets,
  );
  useEffect(() => {
    dispatch(fetchUserTickets());
  }, [dispatch]);

  const ticketData = userTickets.length > 0 ? userTickets[0] : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Ticket</Text>
        <Text></Text>
      </View>
      {ticketData?<>{ticketData && (
        <View style={styles.ticketCard}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>
              {ticketData.eventType || 'Event Type'}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: ticketData.eventMedia || 'https://via.placeholder.com/350',
              }}
              style={styles.imagePlaceholder}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventName}>
                {ticketData.eventName || 'Event Name'}
              </Text>
              <Text style={styles.eventPrice}>
                ${ticketData.ticketPrice||0}
              </Text>
            </View>

            <View style={styles.eventRow}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ticket Holder</Text>
                <Text style={styles.infoValue}>Muhammad Uzair</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.dateLabel}>Date</Text>
                <Text style={styles.infoValue}>
                  {ticketData.eventDate
                    ? new Date(ticketData.eventDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'Date Not Specified'} at 08:00 Am
                </Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>
                  {ticketData.eventLocation || 'Location Not Specified'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cutoutLeft} />
          <View style={styles.cutoutRight} />
          <View style={styles.barcodeContainer}>
            <View style={styles.barcodeBox}>
              <Text></Text>
            </View>
            <Text style={styles.barcodeText}>Scan the barcode</Text>
          </View>
        </View>
      )}</>:<Text style={{color:'white',textAlign:'center',fontSize:20 ,marginTop:30}}>No Ticket Purchased</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171B2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  backButton: {
    padding: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  ticketCard: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 16,
    margin: 16,
    marginTop: 35,
    overflow: 'hidden',
  },
  tagContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#E5E5E5',
    margin: 8,
    borderRadius: 16,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 1,
    marginBottom: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: '500',
    borderRadius: 20,
    width:50,
    textAlign:'center',
    color: '#6C63FF',
    backgroundColor: '#EFF0F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  infoSection: {
    gap: 12,
  },
  infoRow: {},
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    alignSelf: 'flex-end',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  cutoutLeft: {
    position: 'absolute',
    left: -15,
    top: '68%',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#171B2E',
  },
  cutoutRight: {
    position: 'absolute',
    right: -15,
    top: '68%',
    width: 30,
    height: 30,
    backgroundColor: '#171B2E',
    borderRadius: 15,
  },
  barcodeContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding: 16,
    marginTop: 15,
    width: '90%',
    margin: 'auto',
    alignItems: 'center',
  },
  barcodeText: {
    fontSize: 14,
    color: '#666',
  },
  barcodeBox: {
    backgroundColor: '#D9D9D9',
    margin: 10,
    height: 60,
    width: '100%',
  },
});

export default TicketDetailScreen;
