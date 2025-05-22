import { Text, View,Pressable,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useSelector,useDispatch } from 'react-redux';
import { Svg,Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Sizes from '../themes/Sizes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appVersion } from '../constants/appversion';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentTheme = useSelector((state) => state.auth.courrentTheme);
  const name = useSelector((state) => state.auth.name);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const email = useSelector((state) => state.auth.email);
  const userDp = useSelector((state) => state.auth.userDp);
  return (
    <DrawerContentScrollView contentContainerStyle={{backgroundColor:'white',padding:0,minHeight:Sizes.fullHeight}} style={{backgroundColor:'#fff'}} {...props}>
      {/* Custom header */}
      <Svg xmlns="http://www.w3.org/2000/svg" style={{marginLeft:-100,marginTop:-10}} width={Sizes.fullWidth} height="273" viewBox="0 0 632 493" fill="none">
          <Path d="M631 0H0V119.757C33.6 239.514 66 275.441 122 275.441H482C562 275.441 625 419.15 631 493V0Z" fill="#000" stroke="#000"/>
      </Svg>
      
      <View style={{marginTop:-90}}>
        <Pressable
        onPress={()=>{
          props.navigation.closeDrawer();
          navigation.navigate('Profile')
        }}
        android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row',backgroundColor:'#F0F0F0'}}>
          <View style={{width:30}}>
            <FontAwesome name={'user-o'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>প্রোফাইল</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Meetings');props.navigation.closeDrawer();}} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <Entypo name={'video-camera'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>মিটিংস</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Service');props.navigation.closeDrawer();}} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <Entypo name={'tools'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>সার্ভিস</Text>
        </Pressable>
      </View>
      <View style={{width:'100%',height:0.3,backgroundColor:'#535763',opacity:0.5,marginTop:10,marginBottom:10}}></View>
      <View >
        <Pressable onPress={()=>{navigation.navigate('Tutorial');props.navigation.closeDrawer();}} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <Entypo name={'folder-video'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>টিউটোরিয়াল</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Applications');props.navigation.closeDrawer();}} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <MaterialCommunityIcons name={'file-document-edit-outline'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>ব্যাংক</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Support');props.navigation.closeDrawer();}}  android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <Feather name={'phone'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>সাপোর্ট</Text>
        </Pressable>
        
      </View>
      <View style={{width:'100%',height:0.3,backgroundColor:'#535763',opacity:0.5,marginBottom:10}}></View>
      <View >
        <Pressable onPress={()=>{
          dispatch({ type: 'SET_FULL_LOADING', payload: true });
          setTimeout(()=>{
             dispatch({ type: 'SET_LOGGED', payload: false });
             AsyncStorage.setItem("loggedIn","false");
             ZegoUIKitPrebuiltCallService.uninit()
          },1500);
          setTimeout(()=>{
            dispatch({ type: 'SET_FULL_LOADING', payload: false });
          },3000);
          
          }} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          <View style={{width:30}}>
            <MaterialIcons name={'logout'} size={18} color={'#535763'} style={{opacity:0.5}} />
          </View>
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>লগআউট</Text>
        </Pressable>
        
      </View>
      <View >
        <Pressable onPress={()=>{
         
         
          
          }} android_ripple={{color: '#F0F0F0'}} style={{width:180,height:50,borderRadius:25,alignSelf:'center',paddingTop:15,paddingLeft:15,flexDirection:'row'}}>
          
          <Text style={{fontSize:13,fontWeight:'bold',color:'#535763',opacity:0.5}}>ভার্সান {appVersion}</Text>
        </Pressable>
        
      </View>
      <View style={{position:'absolute',top:40,left:0,right:0,width:'100%',height:100,paddingLeft:10,flexDirection:'row',alignItems:'center'}}>
        {userDp !== ''?<Image source={{uri:userDp}} style={{height:50,width:50,borderRadius:25}} />:<Image source={require('../assets/activeprofile.png')} style={{height:50,width:50}} />}
        <View style={{marginLeft:10}}>
          <Text style={{color:'#acaeb0',fontWeight:'bold',textTransform:'uppercase',letterSpacing:1.3,fontSize:15}}>{name}</Text>
          <Text style={{color:'#acaeb0',textTransform:'uppercase',fontSize:11}}>{phoneNumber}</Text>
        </View>
      </View>
      <View style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
        <View style={{width:180,height:30,margin:10,padding:3,backgroundColor:'#F0F0F0',alignSelf:'center',borderRadius:20,flexDirection:'row'}}>
          <Pressable style={{padding:3,backgroundColor:currentTheme !== 'light'?'#fff':null,width:90,borderRadius:15,paddingLeft:10,marginLeft:3,flexDirection:'row',alignItems:'center',elevation:currentTheme !== 'light'?3:0}}>
            <MaterialIcons name="wb-sunny" size={15} color={'#535763'} style={{opacity:0.5,marginRight:10}} />
            <Text style={{color:'#535763',fontSize:13,fontWeight:'bold',opacity:0.5,marginTop:-3}}>লাইট</Text>
          </Pressable>
          <Pressable style={{padding:3,backgroundColor:currentTheme === 'light'?'#fff':null,width:90,borderRadius:15,paddingLeft:15,marginRight:3,marginLeft:-10,flexDirection:'row',alignItems:'center',elevation:currentTheme === 'light'?3:0}}>
            <Feather name="moon" size={15} color={'#535763'} style={{opacity:0.5,marginRight:10}} />
            <Text style={{color:'#535763',fontSize:13,fontWeight:'bold',opacity:0.5,marginTop:-3}}>ডার্ক</Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;