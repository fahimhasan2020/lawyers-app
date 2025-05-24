import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Styles from '../../themes/Styles'

const SearchResult = () => {
  return (
    <View style={styles.container}>
      <TextInput autoFocus placeholder='ক্লাইন্টের নাম অথবা সমস্যা লিখে সার্চ করুন' style={[Styles.searchInput,{borderWidth:1,borderColor:'#ccc'}]} />
      <View style={styles.result}>
        <Text style={{color:'#000'}}>কোন তথ্য পাওয়া যায়নি</Text>
      </View>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#fff'
    },
    result:{
        padding:10
    }
})