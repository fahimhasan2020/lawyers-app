import { StyleSheet, Text, View,StatusBar,Pressable,Image } from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native"
const StackContainer = ({children,title=''}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.content}>
      <View style={styles.barContainer}>
        <Pressable
        onPress={()=>{navigation.goBack()}}
        >
            <Image source={require('../assets/left-arrow.png')} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.titleContent}>{title}</Text>
      </View>
      {children}
    </View>
  )
}

export default StackContainer

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
        width:'100%',
        flex:1,
        backgroundColor:'#ffffff',
    },
    barContainer:{
        backgroundColor:'#ffffff',
        height:60,
        width:"100%",
        paddingLeft:20,
        elevation:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
            }
})