import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator,ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation,useRoute } from '@react-navigation/native';
const PaymentWindow = () => {
  const dispatch = useDispatch();
  const paymentSuccess = useSelector(state=>state.auth.paymentSuccess);
  const navigation = useNavigation();
  const route = useRoute();
  const handleWebViewNavigationStateChange  = async(event) =>{
    console.log(event)
    if(event.url === 'https://ukilvai.com/termsandconditions'){  
      if(!paymentSuccess){
        navigation.reset({
          index: 0,
          routes: [{ name: 'Success' }],
        }); 
        await dispatch({ type: 'SET_PAYMENT_SUCCESS', payload: true });
      }    
    }else if(event.url === 'https://ukilvai.com/privacy'){
        ToastAndroid.show('Payment failed',ToastAndroid.SHORT);
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabsHome' }],
        }); 
    }else if(event.url === 'https://ukilvai.com/refundpolicies'){
        ToastAndroid.show('Payment cancelled by user',ToastAndroid.SHORT);
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabsHome' }],
        }); 
    }else if(event.url === route.params.uri){
      // await dispatch({ type: 'SET_FULL_LOADING', payload: false });
    }
    
    
}
  return (
    <View style={styles.container}>
        <WebView  onNavigationStateChange={(event)=>handleWebViewNavigationStateChange(event)} onLoad={()=>{
          setTimeout(async()=>{
            await dispatch({ type: 'SET_FULL_LOADING', payload: false });
          },2000);
          
        }} source={{ uri: route.params.uri }} style={{ flex: 1 }} />
      </View>
  )
}

export default PaymentWindow


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    }
})