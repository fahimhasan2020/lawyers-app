import { StyleSheet, View,Pressable } from 'react-native'
import React,{useState} from 'react'
import { Colors, Text } from 'react-native-ui-lib'
import { WhiteTextInput } from '../../../components/Inputs'
import { useDispatch,useSelector } from 'react-redux'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useTranslation } from 'react-i18next'
import { googleCoordinate, googleSearch } from '../../../data/api/GoogleSearchApi'
const StepThree = ({errors}) => {
  const {t,i18n} = useTranslation();
  const dispatch = useDispatch();
  const [results,setResults] = useState([]);
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const handleChange = (key, value) => {
    dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
  };

  const setCoordinate  = async(id,address)=>{
    handleChange('address',address);
    const coordinates = await googleCoordinate(id);
    handleChange('lat',coordinates?.lat);
    handleChange('lng',coordinates?.lng);
    setResults([]);
  }
  return (
    <View style={{paddingTop:50}}>
      <WhiteTextInput value={registrationPayload?.address} placeholder={t('findAddress')} onChangeText={async(value)=>{
        handleChange('address',value);
        const result = await googleSearch(value);
        setResults(result);
        }} />
      {errors?.address && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.address}</Text>}
      {errors?.lat && <Text style={{marginHorizontal:40,marginBottom:15}} red10>{errors?.lat}</Text>}
      <View style={{marginHorizontal:40}}>
        {results.map((item,index)=>(<Pressable
        onPress={()=>{
          setCoordinate(item?.place_id,item?.description);
        }}
        key={index} style={styles.suggestions}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} style={{color:Colors.orange10}}  />
          <Text style={{marginLeft:10}}>{item?.description.split(0,25)}</Text>
        </Pressable>))}
      </View>
    </View>
  )
}

export default StepThree

const styles = StyleSheet.create({
  suggestions:{
    width:'100%',
    height:40,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:5
  }
})