import { StyleSheet, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { WhiteTextInput,WhiteInput } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Text,Button } from 'react-native-ui-lib'
import { fireMessage } from '../../../utility/flashMessageFire'
const StepTwo = ({errors}) => {
  const {t,i18n} = useTranslation();
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
      <WhiteTextInput value={registrationPayload?.firstName} placeholder={t('firstName')} onChangeText={(value)=>{
        handleChange('firstName',value);
        }} />
      {errors?.firstName && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.firstName}</Text>}
      <WhiteTextInput value={registrationPayload?.lastName}  placeholder={t('lastName')}  onChangeText={(value)=>{handleChange('lastName',value);}} />
      {errors?.lastName && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.lastName}</Text>}
      <WhiteTextInput value={registrationPayload?.email}  placeholder={t('email')}  onChangeText={(value)=>{handleChange('email',value);}} />
      {errors?.email && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.email}</Text>}
      <WhiteInput keyboardType='numeric' value={registrationPayload?.phoneNumber}  placeholder={t('phoneNumber')}  onChangeText={(value)=>{
         const validChars = /^[0-9]*$/;
         if (validChars.test(value)) {
          handleChange('phoneNumber',value);
         }
        }} />
      {errors?.phoneNumber && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.phoneNumber}</Text>}
    </View>
  )
}

export default StepTwo

const styles = StyleSheet.create({})