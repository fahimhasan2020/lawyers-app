import { StyleSheet, Text, View } from 'react-native'
import React,{useRef,useEffect} from 'react'
import LottieView from "lottie-react-native";
const LoadingBar = () => {
    const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
      style={styles.animationStyle}
      autoPlay loop
      source={require("../assets/animations/loading.json")}
    />
    </View>
  )
}

export default LoadingBar

const styles = StyleSheet.create({
container:{
    position:'absolute',
    top:'45%',
    left:'38%',
    right:'38%',
    alignSelf:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    elevation:10
},
animationStyle:{
    width:80,
    height:80
}
})