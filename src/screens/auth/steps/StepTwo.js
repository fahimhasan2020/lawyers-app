import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { WhiteTextInput,WhiteInput } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
const StepTwo = () => {
  const dispatch = useDispatch();
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };
  return (
    <View style={{paddingTop:50}}>
      <WhiteTextInput value={registrationPayload?.firstName} placeholder='Enter first name' onChangeText={(value)=>{
        handleChange('firstName',value);
        }} />
      <WhiteTextInput value={registrationPayload?.lastName}  placeholder='Enter last name'  onChangeText={(value)=>{handleChange('lastName',value);}} />
      <WhiteTextInput value={registrationPayload?.email}  placeholder='Enter email'  onChangeText={(value)=>{handleChange('email',value);}} />
      <WhiteTextInput value={registrationPayload?.phoneNumber}  placeholder='Enter phone number'  onChangeText={(value)=>{handleChange('phoneNumber',value);}} />
    </View>
  )
}

export default StepTwo

const styles = StyleSheet.create({})