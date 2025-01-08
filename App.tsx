import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SplashScreen from './src/screens/splashScreen/SplashScreen'

export class App extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <SplashScreen/>
      </View>
    )
  }
}

export default App
