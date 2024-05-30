import { StyleSheet, Text, View,Image,KeyboardAvoidingView,Platform,ScrollView,Pressable,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import Container from '../../components/Container'
import ToggleSwitch from '../../components/ToggleSwitch';
import Styles from '../../themes/Styles';
import { WhiteInput } from '../../components/Inputs';
import Sizes from '../../themes/Sizes';
import { Svg,Path } from 'react-native-svg';
import PrimaryButton from '../../components/Buttons';
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { colors } from '../../constants/colors';
import {useNavigation} from "@react-navigation/native"
import { useDispatch,useSelector } from 'react-redux';
import { hideNavigationBar } from 'react-native-navigation-bar-color'
import { LoginManager,Profile,AccessToken } from "react-native-fbsdk-next";
import { useTranslation } from 'react-i18next';
import auth from "@react-native-firebase/auth"
import app from "@react-native-firebase/app"
import database, { firebase } from '@react-native-firebase/database';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { GoogleSignin, statusCodes, GoogleSigninButton, } from '@react-native-google-signin/google-signin';
import loginApiCall from '../../data/api/LoginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { socialLoginApi } from '../../data/api/SocialLoginApi';
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
  const [pushToken, setPushToken] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [userInfo, setUserInfo] = useState({});
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
       const confirm = await auth().signInWithPhoneNumber(
        '+880'+phone
      );
      await setConfirmation(confirm);
      setOtpState(true);
      setLoading(false);
    }catch(e){
      ToastAndroid.show("Failed to login. Try again later", ToastAndroid.SHORT);
      setLoading(false);
    }
     
    } else {
      try {
        await confirmation.confirm(otp);
        await dispatch({ type: 'SET_FULL_LOADING', payload: true });

        const userDetails =  await loginApiCall({phoneNumber:phone,push_token:pushToken});
        console.log(userDetails);
        if(userDetails.hasOwnProperty("token")){
          dispatch({ type: 'SET_LOGGED', payload: true });
          await AsyncStorage.setItem("loggedIn","true");
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
          }
          if(userDetails.user.phone_number){
            await  AsyncStorage.setItem("phoneNumber",phone);
            dispatch({ type: 'SET_PHONE_NUMBER', payload: userDetails.user.phone_number });
          }  
          dispatch({ type: 'SET_FULL_LOADING', payload: false });      
        }
       
      } catch (error) {
        ToastAndroid.show("OTP did not matched", ToastAndroid.SHORT);
        dispatch({ type: 'SET_FULL_LOADING', payload: false });
        console.log('Invalid code.');
        setLoading(false);
      }
      setOtpState(false);
      setLoading(false);
    }
  }

  const initUser = async(token,details) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then(async (json) => {
      dispatch({ type: 'SET_FULL_LOADING', payload: true }); 
      if(details.hasOwnProperty('name')){
        var name = details.name;
        var nameParts = name.split(' ');
        var firstName = nameParts[0];
        var lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        const userDetails = await socialLoginApi({email:json.email,firstName:firstName,lastName:lastName,profilePicture:details.imageURL,pushToken:pushToken});
        console.log(userDetails);
        if(userDetails.hasOwnProperty("token")){
         await AsyncStorage.setItem("loggedIn","true");
         await AsyncStorage.setItem("id",userDetails.user.id.toString());
         dispatch({ type: 'SET_LOGGED', payload: true });
         dispatch({ type: 'SET_ID', payload: userDetails.user.id.toString() });
          if(userDetails.user.first_name){
          await AsyncStorage.setItem("firstName",userDetails.user.first_name);
          dispatch({ type: 'SET_NAME', payload: userDetails.user.first_name+' '+userDetails.user.last_name });
          }
          if(userDetails.user.last_name){
          await  AsyncStorage.setItem("lastName",userDetails.user.last_name);
          }      
          if(userDetails.user.email){
          await  AsyncStorage.setItem("email",userDetails.user.email);
            dispatch({ type: 'SET_EMAIL', payload: userDetails.user.email });
          }        
          if(userDetails.user.profile_picture){
          await  AsyncStorage.setItem("profilePicture",userDetails.user.profile_picture);
            dispatch({ type: 'SET_DP', payload: userDetails.user.profile_picture });
          }
          dispatch({ type: 'SET_FULL_LOADING', payload: false });        
        }
        const userMail = await AsyncStorage.setItem('email', json.email);
        dispatch({ type: 'SET_EMAIL', payload: userMail });
      }})
      .catch(() => {
        reject('ERROR GETTING DATA FROM FACEBOOK');
      })
  }


  const facebookLogin = () =>{
    LoginManager.setLoginBehavior(Platform.OS === 'ios' ? 'web_only' : 'NATIVE_ONLY');
    LoginManager.logInWithPermissions(["public_profile","email"]).then(
      (result)=> {
        console.log(result);
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          const currentProfile = Profile.getCurrentProfile().then(
            async (currentProfile) => {
              if (currentProfile) {
                console.log('fb details',currentProfile);
                var name = currentProfile.name;
                var nameParts = name.split(' ');
                var firstName = nameParts[0];
                var lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
                const loginFirstName = await AsyncStorage.setItem("firstName", firstName);
                const loginLastName = await AsyncStorage.setItem("lastName", lastName);
                await AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  initUser(accessToken,currentProfile);
                })
                
              }
            }
          );
        }
      },
      (error)=> {
        console.log("Login fail with error: " + error);
      }
    );
  }

  const googleLogin = async()=>{

    try {
      GoogleSignin.configure({

      })
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch({ type: 'SET_FULL_LOADING', payload: true }); 
      console.log(userInfo);
      if(userInfo.hasOwnProperty('idToken')){
        const userDetails = await socialLoginApi({email:userInfo.user.email,firstName:userInfo.user.givenName,lastName:userInfo.user.familyName,profilePicture:userInfo.user.photo,pushToken:pushToken});
        console.log(userDetails);
        if(userDetails.hasOwnProperty("token")){
         await AsyncStorage.setItem("loggedIn","true");
         await AsyncStorage.setItem("id",userDetails.user.id.toString());
         dispatch({ type: 'SET_LOGGED', payload: true });
         dispatch({ type: 'SET_ID', payload: userDetails.user.id.toString() });
          if(userDetails.user.first_name){
          await AsyncStorage.setItem("firstName",userDetails.user.first_name);
          dispatch({ type: 'SET_NAME', payload: userDetails.user.first_name+' '+userDetails.user.last_name });
          }
          if(userDetails.user.last_name){
          await  AsyncStorage.setItem("lastName",userDetails.user.last_name);
          }      
          if(userDetails.user.email){
          await  AsyncStorage.setItem("email",userDetails.user.email);
            dispatch({ type: 'SET_EMAIL', payload: userDetails.user.email });
          }        
          if(userDetails.user.profile_picture){
          await  AsyncStorage.setItem("profilePicture",userDetails.user.profile_picture);
            dispatch({ type: 'SET_DP', payload: userDetails.user.profile_picture });
          }
          dispatch({ type: 'SET_FULL_LOADING', payload: false });        
        }
      }
    } catch (error) {
      dispatch({ type: 'SET_FULL_LOADING', payload: false }); 
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('In progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('No play service');
      } else {
        console.log('details',error);
      }
    }

  }
  return (
    <Container> 
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -40} style={{backgroundColor:'#000',flex:1}}>
        <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{backgroundColor:'#000'}}>
      <Image source={require('../../assets/bgone.jpg')} style={{position:'absolute',top:0,height:Sizes.fullWidth,width:Sizes.fullWidth,opacity:0.8}} />
      <View style={[Styles.div,Styles.alignRight]}>
        <ToggleSwitch trueLabel={'বাংলা'} falseLabel={'ENG'} trueState={isEnabled} onToggle={toggleSwitch} />
      </View>
      <Svg xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:70,elevation:10}} width={Sizes.fullWidth} height="336" viewBox="0 0 574 436" fill="none">
          <Path d="M573 435H64H2.99999V252C-1.00001 245 -2.60001 240.4 23 278C48.6 315.6 71 309 64 278L44 192C34 123 92 155 110 192L153 252C250 350 231 245 231 245C231 245 183 136.8 183 132C153 51 225 61 265 132L327 231C394 331 441.333 270.667 422 231L327 83C272.6 -65 367.667 21.3333 422 83L573 262V435Z" fill="#000" stroke="#000"/>
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
          pinCount={6}
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
        </View>
       
      </ScrollView>
      <Pressable
      onPress={()=>{
        navigation.navigate('Registration');
      }}
      style={{
          position:'absolute',
          bottom:100,
          alignSelf:'center'
        }}><Text style={{color:'#fff'}}>{t('register-link')}</Text></Pressable>
      </KeyboardAvoidingView>
      <Svg xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',bottom:0,left:-25}} width="204" height="91" viewBox="0 0 284 171" fill="none">
        <Path d="M283 170H1V1L40 30C79 60 43 74 94 70C145 66 119 145 181 122C230.6 103.6 269.667 146.333 283 170Z" fill="#F04F20" stroke="#F04F20"/>
      </Svg>
    </Container>
  )
}

export default Login
const styles = StyleSheet.create({
  underlineStyleHighLighted:{

  }
})