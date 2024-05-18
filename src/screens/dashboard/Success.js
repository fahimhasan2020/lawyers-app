import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut,FadeInDown,Easing } from 'react-native-reanimated';
const Success = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    setTimeout(()=>{
       navigation.navigate('CallingScreen');
    },5000);
  },[])
  return (
    <View style={styles.container}>
       <LottieView
      style={styles.animationStyle}
      autoPlay loop={false}
      source={require("../../assets/animations/paymentsuccess.json")}
    />
      <Animated.Text entering={FadeInDown.duration(1000).easing(Easing.bounce)} exiting={FadeOut} style={styles.successText}>Payment Completed</Animated.Text>
      <Animated.Text entering={FadeInDown.delay(500).duration(1000).easing(Easing.bounce)} exiting={FadeOut} style={styles.successTextDetails}>Wait for Processing Meeting</Animated.Text>
    </View>
  )
}

export default Success

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  successText:{
    fontSize:20,
    color:'orange',
    fontWeight:700,
    textTransform:'uppercase',
    letterSpacing:1.5
    
  },
  successTextDetails:{
    fontSize:15,
    color:'grey',
    opacity:0.5,
    fontWeight:700,
    textTransform:'uppercase',
    
  },
  animationStyle:{
    width:180,
    height:180
}
})