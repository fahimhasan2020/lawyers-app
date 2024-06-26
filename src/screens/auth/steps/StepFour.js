import { StyleSheet, View,Image } from 'react-native'
import React, { useState } from 'react'
import { WhiteTextInput,WhiteInput, WhiteTextInputArea } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
import {Assets, Colors, RadioButton,Text, RadioGroup} from 'react-native-ui-lib';
const StepFour = () => {
  const dispatch = useDispatch();
  const [gender,setGender] = useState('male');
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };
  return (
    <View>
      <Image source={{uri:'https://placehold.co/400'}} style={styles.dp} />
      <WhiteTextInput value={registrationPayload?.degrees} placeholder='Enter your acquired degrees' onChangeText={(value)=>{handleChange('degrees',value);}} />
      <WhiteTextInput keyboardType='numeric' value={registrationPayload?.visit} placeholder='Expected visit per consultancy' onChangeText={(value)=>{handleChange('visit',value);}} />
      <WhiteTextInputArea keyboardType='numeric' value={registrationPayload?.details} placeholder='Enter your details (Bio)' onChangeText={(value)=>{handleChange('details',value);}} />
      <RadioGroup initialValue={gender || null} style={{paddingHorizontal:35,paddingVertical:10}} onValueChange={value =>{setGender(value)}}>
            <Text marginB-5 text80 color={Colors.white}>
             Select Gender
            </Text>
      <RadioButton labelStyle={{color:Colors.white}} color='orange' marginB-10 value={'male'} label={"Male"}/>
      <RadioButton labelStyle={{color:Colors.white}} color='orange' marginB-10 value={'female'} label={"Female"}/>
      <RadioButton labelStyle={{color:Colors.white}} color='orange'  value={'other'} label={"Other"}/>
      </RadioGroup>
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