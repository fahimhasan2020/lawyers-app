import { StyleSheet, Text, View, Image,Pressable } from 'react-native'
import React,{useState} from 'react'
import Container from '../../components/Container'
import DrawerContainer from '../../components/DrawerContainer'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../constants/colors'
import { BasicModalPopup } from '../../components/ModalsPopup'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux'
const Profile = () => {
  const dispatch = useDispatch();
  const name = useSelector((state)=>state.auth.name);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const email = useSelector((state) => state.auth.email);
  const userDp = useSelector((state) => state.auth.userDp);
  const [modalVisible,setModalVIsible] = useState(false);
  const navigation = useNavigation();
  return (<DrawerContainer showGear={true}>
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      {userDp !== ''?<Image source={{uri:userDp}} style={[styles.avatar,{borderRadius:40}]} />:<Image source={require('../../assets/activeprofile.png')} style={styles.avatar} />}
      </View>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>
        <Text style={styles.phone}>{email}</Text>
      </View>
      <View style={styles.navigationsContainer}>
        <Pressable onPress={()=>{navigation.navigate('Settings')}} style={styles.menus}>
          <Text style={styles.navigationText}>Account Settings</Text>
          <AntDesign name="tool" size={25} style={{opacity:0.6}} color={'grey'} />
        </Pressable>
        <Pressable style={styles.menus}>
          <Text style={styles.navigationText}>Share and Earn</Text>
          <AntDesign name="sharealt" size={21} style={{opacity:0.6}} color={'grey'} />
        </Pressable>
        <Pressable style={styles.menus}>
          <Text style={styles.navigationText}>Rate us on google play</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('TermsAndConditions')}} style={styles.menus}>
          <Text style={styles.navigationText}>Terms & Conditions</Text>
          
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('PrivacyPolicy')}} style={styles.menus}>
          <Text style={styles.navigationText}>Privacy Policy</Text>
          
        </Pressable>
        <Pressable onPress={()=>setModalVIsible(true)} style={styles.menus}>
          <Text style={styles.navigationText}>Delete my account</Text>
          <EvilIcons name="trash" size={30} style={{opacity:0.5}} color={colors.primary} />
        </Pressable>
        
      </View>
    </View>
    <BasicModalPopup modalVisible={modalVisible} onRequestClose={()=>{setModalVIsible(false)}} title="Warning!" body='Are you sure? do you want to delete this account?' permission={true} onCancel={()=>setModalVIsible(false)} onConfirm={()=>{
       setModalVIsible(false);
       dispatch({ type: 'SET_FULL_LOADING', payload: true });
       setTimeout(()=>{
          dispatch({ type: 'SET_LOGGED', payload: false });
          AsyncStorage.setItem("loggedIn","false");
       },1500);
       setTimeout(()=>{
         dispatch({ type: 'SET_FULL_LOADING', payload: false });
       },3000);
    }} />
  </DrawerContainer>)
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-180
    },
    navigationText:{
      fontWeight:'bold',
      fontSize:12,
      opacity:0.5,
      color:'#000'
    },
    menus:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:15
    },
    navigationsContainer:{
      alignSelf:'center',
      width:'70%',
      padding:10,
      borderRadius:10,
      margin:10,
      marginTop:50,
      backgroundColor:'#ffffff',
      elevation:20
    },
    nameConteiner:{
      alignSelf:'center',
      padding:10
    },
    name:{
      fontSize:14,
      color:'orange',
      fontWeight:'bold',
      textTransform:'uppercase',
      
    },
    phone:{
      fontSize:10,
      color:'grey',
      fontWeight:'bold',
      textTransform:'uppercase',
      letterSpacing:0.3,
      opacity:0.6,
      alignSelf:'center'
    },
    avatar:{
      height:80,width:80,
    },

    avatarContainer:{
      padding:10,
      backgroundColor:'#fff',
      width:100,
      height:100,
      borderRadius:50,
      alignSelf:'center',
      elevation:10
    }
})