import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import { ScrollView } from 'react-native-gesture-handler'
import RecentEventCard from '../../components/recenEventCard/RecentEventCard'

const MyPostingScreen = () => {
  return (
    <ScrollView>
        <Text style={styles.heading}>My Event Posting</Text>  
      <View style={styles.eventPosting}>
      <SearchBar/>
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      <RecentEventCard
        category="Workshop"
        imageUrl="https://via.placeholder.com/150" // Replace with a valid image URL
        title="Framer Workshop"
        price="$289"
        date="11 Nov, 2022"
      />
      </View>
    </ScrollView>
  )
}

export default MyPostingScreen
const styles = StyleSheet.create({
    heading: { 
      padding:20,
      fontSize:22,
      fontWeight:600
    },
    eventPosting:{
      padding:20
    }
  })