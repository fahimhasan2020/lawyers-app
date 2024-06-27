import { StyleSheet, View,Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { WhiteTextInput,WhiteInput, WhiteTextInputArea } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
import {Assets, Colors, RadioButton,Text, RadioGroup} from 'react-native-ui-lib';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import { permissionCheck } from '../../../utility/permissioncheck';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
const StepFour = () => {
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();

  const [gender,setGender] = useState('male');
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };
  const captureImage = async()=>{
    const checkAvailability = await permissionCheck(PERMISSIONS.ANDROID.CAMERA);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      }).then(image => {
        console.log(image);
        handleChange('profilePicture',image?.path);
      }).catch(e=>console.log(e));
  }
  return (
    <View>
      <TouchableOpacity onPress={()=>{
        captureImage();
      }}>
        {registrationPayload?.profilePicture ===''?<Image 
        source={{uri:'https://placehold.co/400'}} style={styles.dp} />:<Image 
        source={{uri:registrationPayload?.profilePicture}} style={styles.dp} />}
      </TouchableOpacity>
      <WhiteTextInput value={registrationPayload?.degrees} placeholder={t('enterDegrees')} onChangeText={(value)=>{handleChange('degrees',value);}} />
      <WhiteTextInput keyboardType='numeric' value={registrationPayload?.visit} placeholder={t('consultancyFee')} onChangeText={(value)=>{handleChange('visit',value);}} />
      <WhiteTextInputArea keyboardType='numeric' value={registrationPayload?.details} placeholder={t('enterDetails')} onChangeText={(value)=>{handleChange('details',value);}} />
      <RadioGroup initialValue={gender || null} style={{paddingHorizontal:35,paddingVertical:10}} onValueChange={value =>{setGender(value)}}>
            <Text marginB-5 text80 color={Colors.white}>
            {t('gender')}
            </Text>
      <RadioButton labelStyle={{color:Colors.white}} color='orange' marginB-10 value={'male'} label={t('male')}/>
      <RadioButton labelStyle={{color:Colors.white}} color='orange' marginB-10 value={'female'} label={t('female')}/>
      <RadioButton labelStyle={{color:Colors.white}} color='orange'  value={'other'} label={t('others')}/>
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