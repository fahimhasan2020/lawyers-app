import { StyleSheet, Text, View,Modal,Alert,Pressable } from 'react-native'
import React from 'react'

export const BasicModalPopup = ({modalVisible=false,onRequestClose,title="",body="",permission=false,onCancel,onConfirm}) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      onRequestClose();
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTextTitle}>{title}</Text>
        <Text style={styles.modalText}>{body}</Text>
        {permission?<View style={styles.buttonContainer}>
            <Pressable
            onPress={()=>onCancel()}
            style={{alignSelf:'center',marginRight:10}}
           >
            <Text style={[styles.textStyle,{color:'red'}]}>Cancel</Text>
            </Pressable>
            <Pressable
            onPress={()=>onConfirm()}
            style={[styles.button, styles.buttonClose]}
           >
            <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
        </View>:null}
        
        
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'orange',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color:'#000',
      opacity:0.8
    },
    modalTextTitle: {
      marginBottom: 19,
      color:'#000',
      fontWeight:'bold',
      textTransform:'uppercase',
      letterSpacing:2,
      textAlign: 'center',
    },
  });
  