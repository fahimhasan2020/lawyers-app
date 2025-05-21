import { StyleSheet, Text, View,StatusBar,Pressable,Image } from 'react-native'
import React from 'react'
import { Svg,Path } from 'react-native-svg'
import {useNavigation} from "@react-navigation/native"
import Sizes from '../themes/Sizes'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
const DrawerContainer = ({children,title='',showGear=false}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.content}>
        <Svg xmlns="http://www.w3.org/2000/svg" width={Sizes.fullWidth} height="320" viewBox="0 0 632 493" fill="green">
            <Path d="M631 0H0V119.757C33.6 239.514 66 275.441 122 275.441H482C562 275.441 625 419.15 631 493V0Z" fill="#000" stroke="#000"/>
        </Svg>
        
      <View style={styles.barContainer}>
        <Pressable
        style={{height:60}}
        onPress={()=>{navigation.goBack()}}
        >
            <AntDesign name="arrowleft" size={28} color={'#fff'} />
        </Pressable>
        <Text style={styles.titleContent}>{title}</Text>
        {showGear?<Pressable
        onPress={()=>{}}
        >
            <EvilIcons name="gear" size={30} color={'#fff'} />
        </Pressable>:null}
      </View>
      {children}
      
    </View>
  )
}

export default DrawerContainer

const styles = StyleSheet.create({
    titleContent:{
        fontSize:14,
        fontWeight:'bold',
        letterSpacing:1,
        textTransform:'uppercase',
        marginLeft:10
    },
    backIcon:{
        width:30,
        height:15
    },
    content:{
        width:Sizes.fullWidth,
        flex:1,
        backgroundColor:'#ffffff',
    },
    barContainer:{
        position:'absolute',
        top:0,
        left:0,
        padding:20,
        // backgroundColor:'#ffffff',
        // height:60,
        width:"100%",
        // paddingLeft:20,
        
        justifyContent:'space-between',
        flexDirection:'row',
        
            }
})