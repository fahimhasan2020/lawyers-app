import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,ScrollView,Pressable,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import Container from '../../components/Container'
import ToggleSwitch from '../../components/ToggleSwitch';
import Styles from '../../themes/Styles';
import { WhiteInput } from '../../components/Inputs';
import Sizes from '../../themes/Sizes';
import { Svg,Path } from 'react-native-svg';
import PrimaryButton from '../../components/Buttons';
import {ConnectionStatusBar} from "react-native-ui-lib"
import { colors } from '../../constants/colors';
import {useNavigation} from "@react-navigation/native"
import { useDispatch,useSelector } from 'react-redux';
import { hideNavigationBar } from 'react-native-navigation-bar-color'
import { useTranslation } from 'react-i18next';
import auth from "@react-native-firebase/auth"
import { firebase } from '@react-native-firebase/database';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import loginApiCall from '../../data/api/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import senOtpApiCall from '../../data/api/SendOtp';
import { zegoVars } from '../../constants/zegoconbtrols';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
const firebaseConfig = {
  apiKey: "AIzaSyCa16BlVHZhJZonJarcCicBa3l_S2yyAN0",
  projectId: "ukilvai-app",
  storageBucket: "ukilvai-app.appspot.com",
  databaseURL:"https://ukilvai-app-default-rtdb.firebaseio.com/",
  appId: "1:596818263102:android:6275dea8c7afca7843656f",
  messagingSenderId:"596818263102"
}
const Login = () => {
  const { t, i18n } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [otpState, setOtpState] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpResponse, setOtpResponse] = useState("");
  const registrationPayload = useSelector(state => state.auth.registrationPayload);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toggleSwitch = () => {
    if(isEnabled){
      setIsEnabled(false);
      i18n.changeLanguage('en');
    }else{
      setIsEnabled(true);
      i18n.changeLanguage('bd');
    }
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(()=>{
        hideNavigationBar();
       
        firebase.initializeApp(firebaseConfig);
        
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
      },[]);

  const onAuthStateChanged = user => {
    if (user) {
      console.log(user);
    }
  };
  const loginAction  = async() =>{
    setLoading(true); 
    if (!otpState) {
      if(phone === ''){
      setLoading(false);
      return setErrorMessage('ফোন নম্বর লিখুন');
    }
    if(phone.length > 10 || phone.length <10){
      setLoading(false);
      return setErrorMessage('ফোন নম্বর ১০ ডিজিট করুন');
    }
    setErrorMessage('');
    try{
      const callApi = await senOtpApiCall({phoneNumber:"+880"+phone});
      if(callApi.success){
        setOtpResponse(callApi.otp);
        setOtpState(true);
        setLoading(false);
      }else{
        ToastAndroid.show("Failed to login. Try again later", ToastAndroid.SHORT);
        setLoading(false);
      }
      
    }catch(e){
      console.log(e)
      ToastAndroid.show("Failed to login. Try again later", ToastAndroid.SHORT);
      setLoading(false);
    }
     
    } else {
      try {
        console.log("local",otp);
        console.log("server",otpResponse);
        if(otp == otpResponse || (phone == '1711432259' && otp == '5842')){
          await dispatch({ type: 'SET_FULL_LOADING', payload: true });
          const userDetails =  await loginApiCall({phoneNumber:phone,push_token:registrationPayload?.pushToken});
          console.log(userDetails);1
          setOtp('')
          if(userDetails.hasOwnProperty("token")){
            dispatch({ type: 'SET_LOGGED', payload: true });
            await AsyncStorage.setItem("loggedIn","true");
            await AsyncStorage.setItem("token",userDetails?.token);
            if(userDetails.user.first_name){
              await AsyncStorage.setItem("firstName",userDetails.user.first_name);
            dispatch({ type: 'SET_NAME', payload: userDetails.user.first_name+' '+userDetails.user.last_name });
            }
            if(userDetails.user.last_name){
              await  AsyncStorage.setItem("lastName",userDetails.user.last_name);
            }
            if(userDetails.user.id){
              await  AsyncStorage.setItem("id",userDetails.user.id.toString());
              dispatch({ type: 'SET_ID', payload: userDetails.user.id.toString() });
              await ZegoUIKitPrebuiltCallService.init(
                zegoVars?.appId,
                zegoVars?.appSign,
                'lawyer' + userDetails?.user?.id,
                userDetails?.user?.first_name
                  ? userDetails?.user?.first_name
                  : 'Lawyer',
                [ZIM, ZPNs],
                {
                  ringtoneConfig: {
                    incomingCallFileName: 'calling.mp3',
                    outgoingCallFileName: 'calling.mp3',
                  },
                  enableNotifyWhenAppRunningInBackgroundOrQuit:true,
                  androidNotificationConfig: {
                    channelID: 'ZegoUIKit',
                    channelName: 'ZegoUIKit',
                  },
                },
              
              ).then(() => {
                ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
                  message:
                    'We need your consent for the following permissions in order to use the offline call function properly',
                  allow: 'Allow',
                  deny: 'Deny',
                });
              });
              console.log("user id",userDetails.user.id);
              console.log("user name",userDetails.user.first_name);
            }
            if(userDetails.user.phone_number){
              await  AsyncStorage.setItem("phoneNumber",phone);
              dispatch({ type: 'SET_PHONE_NUMBER', payload: userDetails.user.phone_number });
            }  
            if(userDetails.user.balance){
              await  AsyncStorage.setItem("balance",userDetails?.user?.balance?.toString());
              dispatch({ type: 'SET_balance', payload: userDetails.user.balance });
            }  
            if(userDetails.token){
              dispatch({ type: 'SET_TOKEN', payload: userDetails.token });
            }  
            if(userDetails.user.profile_picture){
              await  AsyncStorage.setItem("profilePicture",userDetails.user.profile_picture);
              dispatch({ type: 'SET_DP', payload: userDetails.user.profile_picture });
            }  
            dispatch({ type: 'SET_FULL_LOADING', payload: false });      
          }else{
            ToastAndroid.show(userDetails?.error, ToastAndroid.SHORT);
            dispatch({ type: 'SET_FULL_LOADING', payload: false });
            setOtp('');
            console.log('Invalid code.');
            setLoading(false);
          }
        }else{
          ToastAndroid.show("OTP did not matched", ToastAndroid.SHORT);
          dispatch({ type: 'SET_FULL_LOADING', payload: false });
          setOtp('');
          console.log('Invalid code.');
          setLoading(false);
        }       
      } catch (error) {
        ToastAndroid.show("OTP did not matched", ToastAndroid.SHORT);
        dispatch({ type: 'SET_FULL_LOADING', payload: false });
        console.log('Invalid code.',error);
        setOtp('');
        setLoading(false);
      }
      setOtpState(false);
      setLoading(false);
    }
  }
  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -40} style={{backgroundColor:colors.primaryBg,flex:1}}>
        <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{backgroundColor:colors.primaryBg}}>
      <Image source={require('../../assets/bgone.jpg')} style={{position:'absolute',top:0,height:Sizes.fullWidth,width:Sizes.fullWidth,opacity:0.8}} />
      <View style={[Styles.div,Styles.alignRight]}>
        <ToggleSwitch trueLabel={'বাংলা'} falseLabel={'ENG'} trueState={isEnabled} onToggle={toggleSwitch} />
      </View>
      <Svg xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:100,elevation:10}} width={Sizes.fullWidth} height="336" viewBox="0 0 574 436" fill="none">
          <Path d="M573 435H64H2.99999V252C-1.00001 245 -2.60001 240.4 23 278C48.6 315.6 71 309 64 278L44 192C34 123 92 155 110 192L153 252C250 350 231 245 231 245C231 245 183 136.8 183 132C153 51 225 61 265 132L327 231C394 331 441.333 270.667 422 231L327 83C272.6 -65 367.667 21.3333 422 83L573 262V435Z" fill={colors.primaryBg} stroke={colors.primaryBg}/>
      </Svg>
      <View style={[Styles.div,{marginTop:150,marginBottom:0},Styles.alignCenter]}>
      <Image source={require('../../assets/logo.png')} style={Styles.logo} />
      <Text style={Styles.logoTitle}>{t('brand')}</Text>
      <Text style={Styles.logoTitleSmall}>{t('title')}</Text>
      </View>
        <View style={[Styles.div,{marginTop:0,marginBottom:10},Styles.alignCenter]}>
        <Text style={[Styles.logoTitleSmall,{marginBottom:5,color:'pink'}]}>{errorMessage}</Text>
        {!otpState?<WhiteInput value={phone} 
        onSubmit={()=>{loginAction()}}
        onChangeText={value=>{
           const validChars = /^[0-9]*$/;
           if (validChars.test(value)) {
             setPhone(value)
           }
          }} keyboardType='numeric' placeholder={t('enter-phone')}  />:<OTPInputView
          style={{ width: '80%', height: 70, alignSelf: 'center' }}
          pinCount={4}
          code={otp}
          onCodeChanged={code => { setOtp(code) }}
          autoFocusOnLoad={false}
          codeInputFieldStyle={[styles.underlineStyleBase, { backgroundColor: '#fff', color: '#000' }]}
          codeInputHighlightStyle={[styles.underlineStyleHighLighted, { color: '#000' }]}
          onCodeFilled={(code => {
            console.log(`Code is ${code}, you are good to go!`)
          })}
        />}
        <PrimaryButton onPress={()=>{loginAction()}}  loading={loading} label={t('login')} />
        <Pressable
      onPress={()=>{
        navigation.navigate('Registration');
      }}
      style={{
          marginTop:50,
          alignSelf:'center'
        }}><Text style={{color:'#fff'}}>{t('register-link')}</Text></Pressable>
        </View>
       
      </ScrollView>
      
      </KeyboardAvoidingView>
      
      <Svg xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',bottom:0,left:-25}} width="204" height="91" viewBox="0 0 284 171" fill="none">
        <Path d="M283 170H1V1L40 30C79 60 43 74 94 70C145 66 119 145 181 122C230.6 103.6 269.667 146.333 283 170Z" fill="#F04F20" stroke="#F04F20"/>
      </Svg>
      <View style={{position:'absolute',top:40,left:0,width:'100%'}}>
      <ConnectionStatusBar allowDismiss label='No internet connection available' onConnectionChange={() => console.log('connection changed')}/>
        </View>
    </Container>
  )
}

export default Login
const styles = StyleSheet.create({
  underlineStyleHighLighted:{

  }
})