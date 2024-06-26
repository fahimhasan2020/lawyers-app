import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import Styles from '../themes/Styles'
import Sizes from '../themes/Sizes'
import FontAwesome from "react-native-vector-icons/FontAwesome"
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
