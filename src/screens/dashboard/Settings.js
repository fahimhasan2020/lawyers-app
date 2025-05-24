import {StyleSheet, Text, View, Image, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import DrawerContainer from '../../components/DrawerContainer';
import { colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fireMessage } from '../../utility/flashMessageFire';

const Settings = () => {
  const {name} = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  return (
    <DrawerContainer>
      <View style={styles.container}>
        <View style={styles.nameConteiner}>
          <Text style={styles.name}>Edit Profile</Text>
        </View>
        <View style={styles.navigationsContainer}>
          <TextInput
          onChangeText={(value)=>{dispatch({type:'SET_NAME',payload:value})}}
          value={name} style={styles.inputField} placeholder='Enter Name' />
          <Pressable onPress={()=>{fireMessage('Profile updated','success')}} style={styles.primaryButton}><Text>Update Profile</Text></Pressable>
        </View>
      </View>
    </DrawerContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  primaryButton:{
    backgroundColor:colors.primary,padding:10,
    alignItems:'center',
    marginTop:50,
    borderRadius:5
  },
  inputField:{
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    marginBottom:10
  },
  container: {
    flex: 1,
    marginTop: -200,
  },
  navigationText: {
    fontWeight: 'bold',
    fontSize: 12,
    opacity: 0.5,
    color: '#000',
  },
  menus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  navigationsContainer: {
    alignSelf: 'center',
    width: '70%',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginTop: 50,
    backgroundColor: '#ffffff',
    elevation: 20,
  },
  nameConteiner: {
    alignSelf: 'center',
    padding: 10,
  },
  name: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  phone: {
    fontSize: 10,
    color: 'grey',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    opacity: 0.6,
    alignSelf: 'center',
  },
  avatar: {
    height: 80,
    width: 80,
  },

  avatarContainer: {
    padding: 10,
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    elevation: 10,
  },
});