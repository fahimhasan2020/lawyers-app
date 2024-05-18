import { StyleSheet, Text, View,StatusBar,SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import Styles from '../themes/Styles'
import { hideNavigationBar } from 'react-native-navigation-bar-color'
const Container = ({children }) => {
  useEffect(()=>{
    //hideNavigationBar();
  },[])
  return (
    <SafeAreaView style={Styles.fullPage}>
    <StatusBar barStyle={'dark-content'} hidden={false} translucent={true} backgroundColor={'transparent'} />
      {children}
    </SafeAreaView>
  )
}

export default Container