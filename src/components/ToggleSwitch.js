import { StyleSheet, Text, View,TouchableHighlight,Animated } from 'react-native'
import React,{useEffect,useState} from 'react'

const ToggleSwitch = ({trueLabel,falseLabel,trueState,onToggle}) => {
  const [widthValue, setWidthValue] = useState(new Animated.Value(35));
  const [widthValueFalse, setWidthValueFalse] = useState(new Animated.Value(0));
  const toggleWidth = () => {
    console.log(trueState);
    if(trueState){
      Animated.timing(widthValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(()=>{
      Animated.timing(widthValueFalse, {
        toValue: 35,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },100)}else{
      Animated.timing(widthValueFalse, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(()=>{
      Animated.timing(widthValue, {
        toValue: 35,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },100)}
   
  };

  return (
    <View>
      <TouchableHighlight onPress={()=>{toggleWidth();onToggle()}} underlayColor={'#e3e6e4'} style={[styles.toggleContainer]}>
        <View style={styles.tootleContent}>
            <Animated.Text style={[styles.toogleSwitchText,{width:widthValue}]}>{trueLabel}</Animated.Text>
            <View style={styles.tootleDot}></View>
            <Animated.Text style={[styles.toogleSwitchText,{width:widthValueFalse}]}>{falseLabel}</Animated.Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default ToggleSwitch

const styles = StyleSheet.create({
    toggleContainer:{
        height:20,
        width:60,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'row'
    },
    padding:{
      padding:20
    },
    toogleSwitchText:{
      fontSize:10,
      color:'#000',
      height:20,
      alignItems:'center',
      textAlign:'center',
      paddingTop:2
    },
    tootleDot:{
        backgroundColor:'#F04F20',
        height:25,
        width:25,
        marginTop:-2.5,
        borderRadius:15,
        elevation:10
    },
    tootleContent:{
        flexDirection:'row',
        width:80
    }

})