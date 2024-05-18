import { StyleSheet, Text, View,Dimensions,Image,StatusBar,Pressable } from 'react-native'
import React from 'react'
import {useNavigation,useRoute} from "@react-navigation/native"
const {height,width}  = Dimensions.get("window");
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import WaveButton from '../../components/WaveButton';
const LawyerDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View  style={styles.container}>
        <View> 
            <Image
      source={route.params.image}
      style={styles.imageSingle}
      /> 
      <View style={styles.imageOverlay}></View>
      <Pressable style={styles.shareButton}>
            <AntDesign name="sharealt" size={20} color="white" />
        </Pressable>
      <Pressable style={styles.heartButton}>
            <AntDesign name="hearto" size={20} color="white" />
        </Pressable>
      <Pressable
      onPress={()=>{
        navigation.goBack();
      }}
      style={styles.backButton}>
            <AntDesign name="arrowleft" size={20} color="white" />
        </Pressable>
        </View>
       
      <View style={styles.detailContainer}>
        <View style={styles.onlineContainer}>
            <Text style={styles.name}>{route.params.datas.name}</Text>
            <Text style={[styles.onlinetagtext,{backgroundColor:route.params.datas.active?'green':'grey',borderColor:route.params.datas.active?'green':'grey'}]}>{route.params.datas.active?'Online':'Offline'}</Text>
        </View>
        
        <Text style={styles.location}>{route.params.datas.jobLocation}</Text>
        <Text style={styles.title}>Tags</Text>
        <View style={styles.tagContainer}>
            <Text style={styles.tagtext}>TAX</Text>
            <Text style={styles.tagtext}>Check Froud</Text>
            <Text style={styles.tagtext}>Divorce</Text>
            <Text style={styles.tagtext}>Land</Text>
            <Text style={styles.tagtext}>Inheritence</Text>
            <Text style={styles.tagtext}>Criminal</Text>
            <Text style={styles.tagtext}>TAX</Text>
            <Text style={styles.tagtext}>Check Froud</Text>
            <Text style={styles.tagtext}>Divorce</Text>
            <Text style={styles.tagtext}>Land</Text>
            <Text style={styles.tagtext}>Inheritence</Text>
            <Text style={styles.tagtext}>Criminal</Text>
        </View>
        <View>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.description}>As a dedicated divorce lawyer, I specialize in guiding individuals through the complex and emotionally challenging process of divorce. With extensive legal expertise, I provide compassionate support, strategic counsel, and effective advocacy to ensure my clients navigate this difficult terrain with confidence and achieve the best possible outcomes for their future.</Text>
        </View>   
      </View>
      <View style={styles.buttonView}>
        <Pressable
        
        android_ripple={{color: '#161717',}} onPress={()=>{
            navigation.navigate('Checkout')
        }}  style={styles.callButton}>
        <FontAwesome name="video-camera" size={20} color={'#30302f'} />
        <Text style={styles.textCall}>Consult Now at ৳ 200</Text>
      </Pressable>
      </View>
      
    </View>
  )
}

export default LawyerDetails

const styles = StyleSheet.create({
    shareButton:{
        position:'absolute',
        right:15,
        top:15
    },
    heartButton:{
        position:'absolute',
        right:60,
        top:15
    },
    backButton:{
        position:'absolute',
        left:15,
        top:15
    },
    callButton:{
        backgroundColor:'#e3b314',
        width:width-40,
        elevation:1,
        padding:10,
        flexDirection:'row',
        justifyContent:'center'
        
    },
    buttonView:{
        borderRadius:15,
        position:'absolute',
        bottom:20,
        alignSelf:'center',
        overflow:'hidden',
        elevation:4
    },
    textCall:{
        color:'#30302f',
        marginLeft:10,
        fontSize:15
    },
    tagContainer:{
        display:'flex',
        flexDirection:'row',
        width:width-50,
        flexWrap:'wrap'
       
    },
    onlineContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        
    },
    tagtext:{
        padding:2,
        paddingLeft:3,
        borderColor:'#000',
        borderWidth:1,
        color:'#000',
        fontSize:10,
        fontWeight:'bold',
        borderRadius:3,
        margin:5,
    },
    onlinetagtext:{
        padding:2,
        paddingLeft:3,
        borderColor:'green',
        backgroundColor:'green',
        borderWidth:1,
        color:'white',
        fontSize:10,
        fontWeight:'bold',
        borderRadius:3,
        margin:5,
        height:18
    },
    container:{
        flex:1,
        backgroundColor:'white',
    },
    imageSingle:{
        width:width,
        height:200
    },
    imageOverlay:{
        width:width,
        height:200,
        backgroundColor:'rgba(72, 97, 112,0.7)',
        position:'absolute',
        top:0,
        left:0,
        right:0
    },
    name:{
        color:'#0f0f0f',
        fontSize:28,
        fontWeight:'bold',
    },
    title:{
        color:'#575659',
        fontSize:20,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:5
    },
    location:{
        color:'#575659',
        fontSize:15,
        fontWeight:'bold',
        marginBottom:5
    },
    detailContainer:{
        padding:10,
    }
})