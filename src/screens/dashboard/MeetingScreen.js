import { StyleSheet, Text, View,StatusBar,Pressable,AppState } from 'react-native'
import React,{useState,useEffect} from 'react'
import Sizes from '../../themes/Sizes'
import LottieView from "lottie-react-native";
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import PipHandler, { usePipModeListener,removeEventListener } from 'react-native-pip-android';

const MeetingScreen = () => {
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
      
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        console.log('App is in a paused state');
        PipHandler.enterPipMode(300, 614);
      } else {
        console.log('App is in the foreground');
        PipHandler.exitPipMode();
        
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      PipHandler.removeEventListener();
    };
  }, []);

  
  const getRandomArbitrary =(min, max) => {
    const value =  Math.ceil(Math.random() * (max - min) + min);
    return value.toString();
  }
  const inPipMode = usePipModeListener();

  if (inPipMode) {
    return (
      <View style={styles.containers}>
        <ZegoUIKitPrebuiltCall
                appID={641606674}
                style={{position:'absolute',top:0,left:0}}
                appSign={'4de0951275f00c1f245bc31a6475951af92bcc0492fb48294b975c3829f934b1'}
                userID={getRandomArbitrary(11111,99999)} 
                userName={'Abul'}
                callID={'112256'} 
                enterPipMode
                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { navigation.navigate('TabsHome') },
                    
                    onHangUp: () => {  
                      try{
                        
                        navigation.navigate('TabsHome');
                      }catch(e){
                        console.log(e);
                      }
                    }
                }}
            />      
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
                appID={641606674}
                style={{position:'absolute',top:0,left:0}}
                appSign={'4de0951275f00c1f245bc31a6475951af92bcc0492fb48294b975c3829f934b1'}
                userID={getRandomArbitrary(11111,99999)} 
                userName={'Abul'}
                callID={'112256'} 
                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { navigation.navigate('TabsHome') },
                    onHangUp: () => {  
                      try{
                        navigation.navigate('TabsHome');
                      }catch(e){
                        console.log(e);
                      }
                    }
                }}
            />      
    </View>
  )
}

export default MeetingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    containers:{
      height:300,
      width:100
    },
    overlay:{
        height:Sizes.fullHeight+StatusBar.currentHeight,
        width:Sizes.fullWidth,
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'rgba(0,0,0,0.6)'
    },
    animationStyle:{
        width:80,
        height:80
    }
})