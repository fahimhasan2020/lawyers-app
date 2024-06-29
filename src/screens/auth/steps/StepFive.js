import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-ui-lib'
import {pick} from "react-native-document-picker"
import React,{useState,useEffect} from 'react'
import { WhiteFileUpload, WhiteTextInput } from '../../../components/Inputs'
import { useTranslation } from 'react-i18next';
import { useDispatch,useSelector } from 'react-redux';
const StepFive = ({errors}) => {
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };
  const [fileNameLLB,setFileNameLLB] = useState("");
  const [fileNameLLM,setFileNameLLM] = useState("");
  const uploadLLBCertificate = async()=>{
    try{
        const [result] = await pick({
        mode: 'open',
        type:'application/pdf',
        copyTo:'documentDirectory'
      }) 
      console.log(result);
      setFileNameLLB(result?.name);
      handleChange('llbCertificate',result?.fileCopyUri);
    }catch(err){
      console.log(err);
    }
  }
  const uploadLLMCertificate = async()=>{
    try{
        const [result] = await pick({
        mode: 'open',
        type:'application/pdf',
        copyTo:'documentDirectory'
      }) 
      console.log(result);
      setFileNameLLM(result?.name);
      handleChange('llmCertificate',result?.fileCopyUri);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <View>
      <WhiteTextInput value={registrationPayload?.experience}
      onChangeText={(value)=>{
        const validChars = /^[0-9]*$/;
        if (validChars.test(value)) {
         handleChange('experience',value);
        }
       }}
      keyboardType='numeric' placeholder={t('totalExperience')} />
      {errors?.experience && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.experience}</Text>}
      <WhiteTextInput 
      onChangeText={(value)=>{
        const validChars = /^[0-9]*$/;
        if (validChars.test(value)) {
         handleChange('age',value);
        }
       }}
      value={registrationPayload?.age} keyboardType='numeric' placeholder={t('age')} />
      {errors?.age && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.age}</Text>}
      <WhiteFileUpload onSubmit={()=>uploadLLBCertificate()} value={fileNameLLB} placeholder={t('llbFilePlaceholder')} filledPlaceholder={t('llbFilePlaceholderFilled')} />
      {errors?.llbCertificate && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.llbCertificate}</Text>}
      <WhiteFileUpload onSubmit={()=>uploadLLMCertificate()} value={fileNameLLM} placeholder={t('llMFilePlaceholder')} filledPlaceholder={t('llMFilePlaceholderFilled')} />
    </View>
  )
}

export default StepFive

const styles = StyleSheet.create({})