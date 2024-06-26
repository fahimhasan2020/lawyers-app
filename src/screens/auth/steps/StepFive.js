import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteTextInput } from '../../../components/Inputs'
const StepFive = () => {
  return (
    <View>
      <WhiteTextInput keyboardType='numeric' placeholder='Total years of experience' />
      <WhiteTextInput keyboardType='numeric' placeholder='Enter your current age' />
    </View>
  )
}

export default StepFive

const styles = StyleSheet.create({})