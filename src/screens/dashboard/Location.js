import {StyleSheet, Text, View, Image, Pressable, TextInput} from 'react-native';
import React, {useRef, useState} from 'react';
import DrawerContainer from '../../components/DrawerContainer';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { getCurrentLocation } from '../../utility/locationService';
import { getFormattedAddress } from '../../utility/getFormatterAddressFromLocation';
import Feather from "react-native-vector-icons/Feather"
import { getPlacePredictions } from '../../utility/getLocationPrediction';
const Location = () => {
  const dispatch = useDispatch();
  const [mapSuggestions,setMapSuggestions] = useState([]);
  const [searchString,setSearchString] = useState('');
  const {currentLocation} = useSelector(state=>state.auth);
  const fetchLocation = async () => {
  const location = await getCurrentLocation();
  if (location) {
    const address = await getFormattedAddress(location?.latitude,location?.longitude);
    console.log(address);
    if(address){
        dispatch({type:'SET_CURRENT_LOCATION',payload:address})
    }
  } else {
    console.log('Location permission denied or failed to get location.');
  }
};
const debounceTimeout = useRef(null);

  const handleChangeText = (text) => {
    setSearchString(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (text.trim().length > 0) {
        const searchResult = await getPlacePredictions(text);
       if(searchResult){
        setMapSuggestions(searchResult);
       }
      }
    }, 500); 
  };
  return (
    <DrawerContainer>
      <View style={styles.container}>
        <View style={styles.nameConteiner}>
          <Text style={styles.name}>Select Location</Text>
        </View>
        <View style={styles.locationContainer}>
            <Pressable onPress={fetchLocation} style={styles.locationMyButton}><MaterialIcons size={20} color={'#000'} name="gps-fixed" /><Text style={styles.regularText}>User my current location</Text></Pressable>
            <Text style={[styles.regularText,{alignSelf:'center',marginLeft:0,marginVertical:10}]}>Or</Text>
            <TextInput value={searchString} onChangeText={(value)=>handleChangeText(value)} style={styles.locationSearchInput} placeholder='Search your location here ..' />
            {mapSuggestions?.length>0 && mapSuggestions.map((item,index)=>(<Pressable
            onPress={()=>{
                dispatch({type:'SET_CURRENT_LOCATION',payload:item?.description});
                setMapSuggestions([]);
            }}
            style={styles.singleSuggestionButton}><Feather  name="map-pin" size={20} color={'orange'} style={{marginRight:15}} /><Text style={styles.selectedLocation}>{item?.description}</Text></Pressable>))}
            {(currentLocation && currentLocation !== '')?<Text style={styles.selectedLocation}>{currentLocation}</Text>:<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={styles.selectedLocation}>No selected location</Text></View>}
        </View>
      </View>
    </DrawerContainer>
  );
};

export default Location;

const styles = StyleSheet.create({
 singleSuggestionButton:{
    flexDirection:'row',
    padding:10,
    width:'90%',
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
 },
 selectedLocation:{
    color:'#000',
    fontSize:12
 },
 locationSearchInput:{
    padding:10,
    marginVertical:20,
    borderWidth:1,
    borderColor:'#ddd',
    width:300,
    borderRadius:5
 },
 regularText:{
    color:'#000',
    fontSize:12,
    marginLeft:15
 },
 locationMyButton:{
    flexDirection:'row',
    backgroundColor:'#fff',
    elevation:2,
    width:300,
    padding:10,
    borderRadius:5
 },
 locationContainer:{
    padding:20,
    paddingTop:40,
    flex:1
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