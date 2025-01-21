import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TicketDetailProps {
  ticketType: string;
  eventName: string;
  price: number;
  ticketHolder: string;
  date: string;
  location: string;
}

const TicketDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  const ticketData: TicketDetailProps = {
    ticketType: 'Concert',
    eventName: 'Radiohead Concert',
    price: 152,
    ticketHolder: 'Rizal Dwayne',
    date: '22 Oct, 2022 at 8:00 Am',
    location: 'Purwokerto, Indonesia',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          {/* <Image 
            source={require('../assets/back-arrow.png')} 
            style={styles.backIcon}
          /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Ticket</Text>
      </View>

      {/* Ticket Card */}
      <View style={styles.ticketCard}>
        {/* Top Ticket Tag */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{ticketData.ticketType}</Text>
        </View>

        {/* Event Image */}
        <View style={styles.imageContainer}>
          {/* Replace with actual event image */}
          <View style={styles.imagePlaceholder} />
        </View>

        {/* Event Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventName}>{ticketData.eventName}</Text>
            <Text style={styles.eventPrice}>${ticketData.price}</Text>
          </View>
         <View style={styles.eventRow}>
         <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ticket Holder</Text>
              <Text style={styles.infoValue}>{ticketData.ticketHolder}</Text>
            </View>
            <View style={styles.infoRow}>
                
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.infoValue}>{ticketData.date}</Text>
            </View>
         </View>
          {/* Ticket Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{ticketData.location}</Text>
            </View>
          </View>
        </View>

        {/* Ticket Cutout Design */}
        <View style={styles.cutoutLeft} />
        <View style={styles.cutoutRight} />

        {/* Barcode Section */}
        <View style={styles.barcodeContainer}>
            <View style={styles.barcodeBox}>
                <Text></Text>
            </View>
          <Text style={styles.barcodeText}>Scan the barcode</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171B2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop:30
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  ticketCard: {
    backgroundColor: 'white',
    flex:1,
    borderRadius: 16,
    margin: 16,
    marginTop:35,
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
    margin:8,
    borderRadius:16
    
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderRadius:16,
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
  eventRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight:1,
    
    // width:'95%',
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
    borderRadius:20,
    color: '#6C63FF',
    backgroundColor:'#EFF0F9',
    paddingHorizontal:8,
    paddingVertical:4
  },
  infoSection: {
    gap: 12,
  },
  infoRow: {
    // marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    alignSelf:'flex-end'
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
    backgroundColor:'#171B2E',
    
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
    marginTop:15,
    width:'90%',
    margin:'auto',
    alignItems: 'center',
  },
  barcodeText: {
    fontSize: 14,
    color: '#666',
  },
  barcodeBox:{
    backgroundColor:'#D9D9D9',
    margin:10,
    height:60,
    width:'100%'
    
  }
});

export default TicketDetailScreen;