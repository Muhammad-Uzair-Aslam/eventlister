// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { useNavigation, RouteProp } from '@react-navigation/native';

// // Define navigation types
// interface EventDetailProps {
//   title: string;
//   price: number;
//   participants: number;
//   date: string;
//   description: string;
//   organizer: {
//     name: string;
//     avatar?: string;
//   };
// }

// type AuthStackParamList = {
//   EventDetail: { event: EventDetailProps };
// };

// type EventDetailScreenRouteProp = RouteProp<AuthStackParamList, 'EventDetail'>;

// type EventDetailScreenProps = {
//   route: EventDetailScreenRouteProp;
// };

// const EventDetailScreen: React.FC<EventDetailScreenProps> = ({route}) => {
//   const { event } = route.params; // Extract 'event' from route.params
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()} 
//           style={styles.backButton}
//         >
//           {/* Add back icon if needed */}
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{event.title}</Text>
//       </View>

//       <ScrollView style={styles.scrollView}>
//         {/* Event Image */}
//         <View style={styles.imageContainer}>
//           <View style={styles.imagePlaceholder} />
//         </View>

//         {/* Event Info */}
//         <View style={styles.eventInfo}>
//           <View style={styles.titleRow}>
//             <Text style={styles.title}>{event.participants}</Text>
//             <Text style={styles.price}>${event.price}</Text>
//           </View>

//           <View style={styles.participantsRow}>
//             <Text style={styles.participants}>{event.participants}</Text>
//             <Text style={styles.date}>• {event.date}</Text>
//           </View>

//           {/* About Section */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>About Event</Text>
//             <Text style={styles.description} numberOfLines={3}>
//               {event.description}            
//               </Text>
//             <TouchableOpacity>
//               <Text style={styles.readMore}>Read More</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Organizer */}
//           <View style={styles.organizerSection}>
//             <View style={styles.organizerAvatar} />
//             <Text style={styles.organizerName}>jutt g</Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Buy Ticket Button */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.buyButton}>
//           <Text style={styles.buyButtonText}>Buy Ticket</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 12,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#E5E7EB',
//     borderRadius: 16,
//   },
//   eventInfo: {
//     padding: 16,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#6366F1',
//   },
//   participantsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   participants: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   date: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginLeft: 8,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 14,
//     color: '#6B7280',
//     lineHeight: 20,
//   },
//   readMore: {
//     fontSize: 14,
//     color: '#6366F1',
//     marginTop: 8,
//   },
//   organizerSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   organizerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E5E7EB',
//     marginRight: 12,
//   },
//   organizerName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#1F2937',
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   buyButton: {
//     backgroundColor: '#6366F1',
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default EventDetailScreen;
