import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WhiteTextInput } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
const StepThree = () => {
  const dispatch = useDispatch();
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };
  return (
    <View style={{paddingTop:50}}>
      <WhiteTextInput value={registrationPayload?.address} placeholder='Enter service location' onChangeText={(value)=>{handleChange('address',value);}} />
    </View>
  )
}

export default StepThree

const styles = StyleSheet.create({})