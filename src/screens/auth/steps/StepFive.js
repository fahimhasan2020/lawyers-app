import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteTextInput } from '../../../components/Inputs'
const StepFive = () => {
  return (
    <View>
      <WhiteTextInput placeholder='Total years of experience' />
      <WhiteTextInput placeholder='Enter your current age' />
    </View>
  )
}

export default StepFive

const styles = StyleSheet.create({})