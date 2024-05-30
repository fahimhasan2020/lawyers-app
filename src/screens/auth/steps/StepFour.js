import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { WhiteTextInput,WhiteInput } from '../../../components/Inputs'
const StepFour = () => {
  return (
    <View>
      <Image source={{uri:'https://placehold.co/400'}} style={styles.dp} />
      <WhiteTextInput placeholder='Enter your acquired degrees' />
    </View>
  )
}


export default StepFour;

const styles = StyleSheet.create({
  dp:{
    height:80,
    width:80,
    borderRadius:40,
    backgroundColor:'#ccc',
    alignSelf:'center',
    marginBottom:20
  }
})