import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteTextInput } from '../../../components/Inputs'
const StepThree = () => {
  return (
    <View style={{paddingTop:50}}>
      <WhiteTextInput placeholder='Enter service location' />
    </View>
  )
}

export default StepThree

const styles = StyleSheet.create({})