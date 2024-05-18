import { StyleSheet, Text, View, Image,Pressable } from 'react-native'
import React,{useState} from 'react'
import Container from '../../components/Container'
import DrawerContainer from '../../components/DrawerContainer'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../constants/colors'
import { BasicModalPopup } from '../../components/ModalsPopup'

const Documents = () => {
  return (<DrawerContainer>
    <View style={styles.container}>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>Documents</Text>
      </View>
     
    </View>
  </DrawerContainer>)
}

export default Documents

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-200
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