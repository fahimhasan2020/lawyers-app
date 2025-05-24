import { StyleSheet, View,StatusBar,SafeAreaView,Image,TextInput,Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Text,Switch } from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native'
import Styles from '../themes/Styles'
import changeNavigationBarColor, { hideNavigationBar,showNavigationBar, } from 'react-native-navigation-bar-color'
import { Svg,Path } from 'react-native-svg'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Sizes from '../themes/Sizes'
import { useDispatch,useSelector } from 'react-redux'
import ApiService from '../utility/apiServices'
const TabContainer = ({children }) => {
  const dispatch = useDispatch();
  const {currentLocation} = useSelector(state=>state.auth);
  const userOnline = useSelector(state=>state?.auth.online);
  const userId = useSelector(state=>state?.auth.id);
  const navigation = useNavigation();
  useEffect(()=>{
    showNavigationBar();
    changeNavigationBarColor('#000000', true);
    
  },[]);

  const updateOnline = async()=>{
    await dispatch({ type: 'SET_ONLINE', payload: !userOnline });
    console.log(!userOnline,userOnline);
    const dataset = {
      online:!userOnline,
      userId:userId
    }
   const result =  await ApiService.post('update/profile',dataset);
   console.log(result);
  }
  return (
    <SafeAreaView style={Styles.fullPageWhite}>
    <StatusBar barStyle={'light-content'} hidden={false} translucent={false} backgroundColor={'#000'} />
    <Svg xmlns="http://www.w3.org/2000/svg" width={Sizes.fullWidth+20} height="493" viewBox="0 0 632 493" fill="none">
        <Path d="M631 0H0V119.757C33.6 239.514 66 275.441 122 275.441H482C562 275.441 625 419.15 631 493V0Z" fill="#000" stroke="#000"/>
    </Svg>
    <View style={{width:Sizes.fullWidth,zIndex:2,flexDirection:'row',height:70,position:'absolute',top:100,left:0,justifyContent:'space-between',paddingTop:30,paddingLeft:20,paddingRight:20}}>
        <Pressable onPress={()=>navigation.navigate('Location')} style={{flexDirection:'row',marginLeft:10}}>
           <Entypo name="location" size={20} color={'#fff'} style={{marginTop:15}} />
            <Text text70BL marginL-s3 marginT-s4 color="white">{currentLocation.length>20?currentLocation?.slice(0,20)+"...":currentLocation}</Text>
        </Pressable>
       
        <Switch value={userOnline} onColor={'green'} marginT-s4 marginR-s3 onValueChange={() => {updateOnline()}}/>
       
    </View>
    <View style={{width:Sizes.fullWidth,zIndex:2,height:70,position:'absolute',top:160,left:0,justifyContent:'space-between',paddingTop:30,paddingLeft:20,paddingRight:20,alignItems:'center'}}>
        <TextInput onFocus={()=>{
          navigation.navigate('SearchResult')
        }} placeholder='ক্লাইন্টের নাম অথবা সমস্যা লিখে সার্চ করুন' style={Styles.searchInput} />
        <EvilIcons name="search"  size={25} color={'#adadad'} style={{position:'absolute',left:35,top:40}}/>
    </View>
      {children}
    </SafeAreaView>
  )
}

export default TabContainer