import { StyleSheet, View,TextInput,Pressable } from 'react-native'
import { Text } from 'react-native-ui-lib'
import React from 'react'
import Styles from '../themes/Styles'
import Sizes from '../themes/Sizes'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
export const WhiteInput = ({placeholder='',value='',onChangeText,keyboardType='default',onSubmit}) => {
  return (
    <View style={[{width:Sizes.fullWidth,height:60},Styles.alignCenter]}>
      <TextInput onSubmitEditing={onSubmit} keyboardType={keyboardType} placeholderTextColor={'#000'} placeholder={placeholder} value={value} onChangeText={onChangeText} style={Styles.whiteInput} />
      <View style={Styles.prefixContainer}>
        <FontAwesome name={'phone'} size={20} color={'#000'} />
        <Text style={Styles.prefixContainerText}>+880 - </Text>
      </View>
      
    </View>
  )
}
export const WhiteTextInput = ({placeholder='',value='',onChangeText,keyboardType='default',onSubmit}) => {
  return (
    <View style={[{width:Sizes.fullWidth,height:60},Styles.alignCenter]}>
      <TextInput onSubmitEditing={onSubmit} keyboardType={keyboardType} placeholderTextColor={'#000'} placeholder={placeholder} value={value} onChangeText={onChangeText} style={[Styles.whiteInput,{paddingLeft:20}]} />
    </View>
  )
}
export const WhiteTextInputArea = ({placeholder='',value='',onChangeText,keyboardType='default',onSubmit}) => {
  return (
    <View style={[{width:Sizes.fullWidth,height:140},Styles.alignCenter]}>
      <TextInput textAlignVertical="top" onSubmitEditing={onSubmit} keyboardType={keyboardType} placeholderTextColor={'#000'} multiline placeholder={placeholder} value={value} onChangeText={onChangeText} style={[Styles.whiteInput,{paddingLeft:10,height:140}]} />
    </View>
  )
}

export const WhiteFileUpload = ({placeholder='',value='',onChangeText,keyboardType='default',onSubmit,filledPlaceholder =''}) => {
  return (
    <Pressable onPress={onSubmit} style={[{width:Sizes.fullWidth - 80,borderRadius:15,height:140,backgroundColor:'white',alignSelf:'center',justifyContent:'center',marginVertical:10},Styles.alignCenter]}>
      {value === ''? <AntDesign name="plus" size={20} color={'#000'} />:<Text style={{fontSize:10,fontWeight:'bold',color:'#ccc',textAlign:'center',marginTop:10}}>{filledPlaceholder}</Text>}
      <Text style={{fontSize:16,fontWeight:'bold',color:'#000',textAlign:'center',marginTop:10}}>{value !== ''?value:placeholder}</Text>
    </Pressable>
  )
}
