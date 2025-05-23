import { Pressable, StyleSheet, Text, View} from 'react-native'
import React,{useEffect, useState} from 'react'
import DrawerContainer from '../../components/DrawerContainer'
import { useRoute } from '@react-navigation/native'
import getUserDetailsApi from '../../data/api/GetUserDetailsApi'

import ZegoUIKitPrebuiltCallService,{ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const CaseDetails = () => {
const route = useRoute();  
const [userDetails,setUserDetails] = useState(null)
  useEffect(()=>{
    getUserDetailsData();
  },[])
  const getUserDetailsData = async ()=>{
    const datas = await getUserDetailsApi({id:route?.params?.user_id});
    console.log(datas)
    setUserDetails(datas);
  }
  
  const formatSQLDateTime =(sqlDateTime)=> {
    const date = new Date(sqlDateTime);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${timeStr} ${day} ${month} ${year}`;
  }
  return (<DrawerContainer>
    <View style={styles.container}>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>Case Details</Text>
      </View>
     <View style={styles.detailsBox}>
        <Text style={styles.titleOne}>{userDetails?.first_name} {userDetails?.last_name}</Text>
        <Text style={styles.titleTwo}>{route?.params?.category}</Text>
        <Text style={[styles.titleThree,{marginBottom:40}]}>{formatSQLDateTime(route?.params?.created_at)}</Text>
       
        <Text style={styles.titleThree}>Price: {route?.params?.amount} BDT</Text>
        <View style={styles.pressable}>
            <ZegoSendCallInvitationButton
            text={'Call'}
            width={200}
            height={50}
            textColor={'#000'}
            backgroundColor={'orange'}
            borderRadius={10}
            borderWidth={2}
            borderColor={'#0E0E0E'}
            borderStyle={'solid'}
            fontSize={16}
            invitees={[
               { userID:'user'+route?.params?.user_id,
                userName:userDetails?.first_name+" "+userDetails?.last_name}
            ]}
            isVideoCall={true}
            resourceID={"zego_call"}
          />
        </View>
        
     </View>
    </View>
  </DrawerContainer>)
}

export default CaseDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-200
    },
    callButton:{
        color:'#000',
        fontWeight:'500'
    },
    pressable:{
        position:'absolute',
        bottom:10,
        alignSelf:'center',
        paddingHorizontal:40,
        paddingVertical:15,
        borderRadius:15
    },
    titleOne:{
        fontSize:20,
        fontWeight:'800',
        color:'#000',
        marginBottom:20
    },
    titleTwo:{
        fontSize:16,
        fontWeight:'400',
        color:'#000'
    },
    titleThree:{
        fontSize:12,
        fontWeight:'400',
        color:'#000'
    },
    detailsBox:{
        padding:10,
        borderRadius:5,
        height:500,
        width:'90%',
        marginHorizontal:10,
        marginVertical:10,
        marginTop:100,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
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