import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import LottieView from "lottie-react-native";
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut,FadeInDown,Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
const CallingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialSeconds = 1 * 60;
  const [seconds, setSeconds] = useState(initialSeconds);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(()=>{
    let interval;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      dispatch({ type: 'SET_PAYMENT_SUCCESS', payload: false });
      navigation.navigate('MeetingScreen');
    }

    return () => clearInterval(interval);
  },[seconds]);



  return (
    <View style={styles.container}>
       <View style={styles.timer}>
      <Text style={styles.timerText}>Wait for a while</Text>
      <Text style={styles.timerCountingText}>{formatTime(seconds)} s</Text>
    </View>
       <LottieView
      style={styles.animationStyle}
      autoPlay loop={true}
      source={require("../../assets/animations/meetingprogress.json")}
    />
    <View style={styles.concern}>
      <Text style={styles.successText}>Meeting In Progress</Text>
      <Text style={styles.successTextDetails}>Don't close the window</Text>
    </View>
      
    </View>
  )
}

export default CallingScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  concern:{
    textAlign:'center',
    alignItems:'center',
    marginTop:150
  },
  timer:{
    textAlign:'center',
    alignItems:'center',
    marginTop:20
  },
  timerCountingText:{
    fontSize:25,
    fontWeight:'bold',
    letterSpacing:1
  },
  successText:{
    fontSize:20,
    color:'orange',
    fontWeight:700,
    textTransform:'uppercase',
    letterSpacing:1.5
    
  },
  timerText:{
    fontSize:20,
    color:'orange',
    fontWeight:700,
    
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