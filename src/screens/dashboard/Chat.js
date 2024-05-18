import { StyleSheet, Text, View,Image,TextInput,Pressable,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import TabContainer from '../../components/TabContainer'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Sizes from '../../themes/Sizes'

const Chat = () => {
  const [showFIrstComment,setShowFirstComment] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setShowFirstComment(true);
    },5000);
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../../assets/chat.png')} style={{width:40,height:40}} />
        <Text style={{color:'#acaeb0',fontSize:20,marginLeft:20}}>উকিল ভাই AI Chat</Text>
      </View>
      <ScrollView contentContainerStyle={{minHeight:Sizes.fullHeight,justifyContent:'flex-end',paddingBottom:150}}>
        {showFIrstComment?<View style={{flexDirection:'row',marginLeft:10}}>
          <Image source={require('../../assets/chatbot.png')} style={{width:20,height:20,marginTop:10}} />
          <View style={{width:Sizes.fullWidth/2.5,backgroundColor:'#fff',padding:15,borderTopRightRadius:5,borderBottomRightRadius:15,borderBottomLeftRadius:30,margin:10,elevation:3}}>
          <Text style={{fontSize:14,fontWeight:'bold',opacity:0.8}}>আসসালামু আলাইকুম। উকিলভাই app এ আপনাকে স্বাগতম। বলুন আমরা কি তথ্য দিয়ে আপনাকে সহায়তা করতে পারি?</Text>
        </View>
        </View>:null}
        
        
      </ScrollView>
      <View style={styles.inputBar}>
        <Pressable>
          <Entypo name="images" size={30} color={'#000'} style={{marginLeft:5, opacity:0.5}} />
        </Pressable>
        <Pressable>
          <MaterialIcons name="attach-file" size={30} color={'#000'} style={{marginLeft:5, opacity:0.5}} />
        </Pressable>
        <View>
          <TextInput placeholder='Type here ....' style={styles.searchInput} />
          <Pressable style={{position:'absolute',right:10,top:5}}>
          <MaterialCommunityIcons name="send-circle-outline" size={30} color={'#000'} style={{marginLeft:5, opacity:0.5}} />
        </Pressable>
        </View>
        
      </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ebedf0'
  },
  searchInput:{
    width:Sizes.fullWidth/1.4,
    backgroundColor:'#fff',
    height:40,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:25,
    paddingLeft:20
  },
  topBar:{width:'100%',padding:20,height:80,backgroundColor:'#000',flexDirection:'row',alignItems:'center',elevation:3},
  inputBar:{
    flexDirection:'row',
    position:'absolute',
    width:'100%',
    bottom:0,
    left:0,
    right:0,
    height:60,
    backgroundColor:'#fff',
    elevation:10,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
alignItems:'center',
justifyContent:'center'
  }
})