import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sizes from '../themes/Sizes'
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
const FullPageLoader = () => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <LottieView
      style={styles.animationStyle}
      autoPlay loop={true}
      source={require("../assets/animations/placeholder.json")}
    />
      <LottieView
      style={styles.animationStyle}
      autoPlay loop={true}
      source={require("../assets/animations/placeholder.json")}
    />
    </Animated.View>
  )
}

export default FullPageLoader

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        position:'absolute',
        top:0,
        left:0,
        height:Sizes.fullHeight+100,
        width:Sizes.fullWidth
    },
    animationStyle:{
        height:Sizes.fullHeight/2,
        width:Sizes.fullWidth,
        opacity:0.3
    }
})