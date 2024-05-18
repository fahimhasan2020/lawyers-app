import { StyleSheet, Text, View,Pressable,ActivityIndicator} from 'react-native'
import React from 'react'
import Styles from '../themes/Styles'
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../constants/colors'
const PrimaryButton = ({label,loading= false,onPress}) => {
  return (<Pressable onPress={onPress} style={Styles.buttons}>
         <Text style={Styles.buttonsColor}>{label}</Text>
         {loading?<ActivityIndicator style={{marginLeft:10}} size={'small'} color={colors.primary} />:<AntDesign name="rightcircle" size={20} color={colors.primary} style={{marginLeft:10}} />}
      </Pressable>)
}

export default PrimaryButton