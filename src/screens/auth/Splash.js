import { StyleSheet, Text, View,Image,ActivityIndicator } from 'react-native'
import React,{useEffect} from 'react'
import Container from '../../components/Container'
import Sizes from '../../themes/Sizes'
import Styles from '../../themes/Styles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { firebasesetup } from '../../utility/firebasesetup'
import updatePayload from '../../data/api/RefreshApp'
const Splash = () => {
const dispatch = useDispatch();
const navigation = useNavigation();
useEffect(()=>{
  firebasesetup();
  setTimeout(async()=>{
      await loggedInCheck()
    },3000);
},[]);

const loggedInCheck = async()=>{
  const loggedInStat = await AsyncStorage.getItem("loggedIn");
  const pushToken = await AsyncStorage.getItem("pushToken");
  
  if(loggedInStat !== null && loggedInStat !== '' && loggedInStat !== undefined){
    if(loggedInStat === "true"){
      await dispatch({ type: 'SET_FULL_LOADING', payload: true });
      const id = await AsyncStorage.getItem("id");
      const firstName = await AsyncStorage.getItem("firstName");
      const lastName = await AsyncStorage.getItem("lastName");
      const email = await AsyncStorage.getItem("email");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      const dp = await AsyncStorage.getItem("profilePicture");
      const dataToken = await AsyncStorage.getItem("token");
      
      const tokenCurrent = await updatePayload(dataToken);
      if(id !== null || id !== '' || id !== undefined){
       await dispatch({ type: 'SET_ID', payload: id });
      }
      if(phoneNumber !== null || phoneNumber !== '' || phoneNumber !== undefined){
       await dispatch({ type: 'SET_PHONE_NUMBER', payload: phoneNumber });
      }
      if(email !== null || email !== '' || email !== undefined){
       await dispatch({ type: 'SET_EMAIL', payload: email });
      }
      if(firstName !== null || firstName !== '' || firstName !== undefined){
       await dispatch({ type: 'SET_NAME', payload: firstName+' '+lastName });
      }
      if(dp !== null || dp !== '' || dp !== undefined){
       await dispatch({ type: 'SET_DP', payload: dp });
      }
      if(tokenCurrent){
       await dispatch({ type: 'SET_BALANCE', payload: tokenCurrent?.user?.balance });
       await dispatch({ type: 'SET_TOKEN', payload: tokenCurrent?.token });
      }
      if(dataToken !== null || dataToken !== '' || dataToken !== undefined){
        if(tokenCurrent?.user?.online === "1"){
          await dispatch({ type: 'SET_ONLINE', payload: true });
        }else{
          await dispatch({ type: 'SET_ONLINE', payload: false });
        }
      }
      
      await dispatch({ type: 'SET_LOGGED', payload: true });
      await dispatch({ type: 'SET_FULL_LOADING', payload: false });
    }else{
      handleChange("pushToken",pushToken);
      navigation.navigate("Login");
    }
  }else{
    handleChange("pushToken",pushToken);
    navigation.navigate("Login");
  }
}

const handleChange = (key, value) => {
  dispatch({ type: 'UPDATE_REGISTRATION_PAYLOAD', key, value });
};
  return (
    <Container>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../../assets/splash.png')} style={{height:Sizes.fullHeight+200,width:Sizes.fullWidth,opacity:0.88,position:'absolute',top:0,left:0}} />
      <Image source={require('../../assets/logo-tr.png')} style={{height:200,width:200,marginTop:150}} />
      <Text style={[Styles.logoTitleSmall,{marginTop:150,width:200,textAlign:'center'}]}>বাংলাদেশের সর্বোবৃহৎ আইনি সেবাদানকারী প্রতিষ্ঠান</Text>
      <ActivityIndicator style={{marginTop:100}} color={'#fff'} size={'large'} />
      </View>
    </Container>
  )
}

export default Splash

const styles = StyleSheet.create({})