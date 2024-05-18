import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sizes from '../themes/Sizes'

const AppStatusBar = ({color='orange',textDialog='Network connection error'}) => {
  return (
    <View style={[styles.container,{backgroundColor:color}]}>
      <Text style={styles.barText}>{textDialog}</Text>
    </View>
  )
}

export default AppStatusBar

const styles = StyleSheet.create({
    container:{
        width:Sizes.fullWidth,
        height:30,
        alignItems:'center',
        padding:5,
        position:'absolute',
        top:0,
        left:0
    },
    barText:{
        color:'#000',
        fontSize:15,
        fontWeight:'bold'
    }
})