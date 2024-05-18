import { StyleSheet, Text, View,ScrollView,Pressable,FlatList } from 'react-native'
import React,{useEffect} from 'react'
import TabContainer from '../../components/TabContainer'
import Styles from '../../themes/Styles'
import LawyerList from '../../components/LawyerList';

const matters = [
  {
    id:'1',
    topic:'ডিভোর্সের মামলা সম্পর্কিত তথ্য জানতে কল করুন',
    price:'৯৯'
  },
  {
    id:'2',
    topic:'সন্তানের ভরনপোষন আদায়ে পরামর্শ নিন',
    price:'৯৯'
  },
  {
    id:'3',
    topic:'ফৌজদারি মামলা সংক্রান্ত পরামর্শ নিতে যোগাযোগ করুন',
    price:'৯৯'
  },
  {
    id:'4',
    topic:'টেক্স সংক্রান্ত পরামর্শ নিতে কল করুন',
    price:'৯৯'
  },
  {
    id:'5',
    topic:'জমির বিবাদ মিটাতে উকিলের পরামর্শ নিন',
    price:'৯৯'
  },
  {
    id:'6',
    topic:'অংশীদারত্বের অংশ বুঝে নিতে পরামর্শ নিন',
    price:'৯৯'
  },
  {
    id:'7',
    topic:'যেকোন বিষয়ে উকিল নোটিশ  পাঠাতে কল করুন',
    price:'৯৯'
  },
  {
    id:'8',
    topic:'ভোক্তা অধিকার সংক্রান্ত তথ্য জানতে কল করুন',
    price:'৯৯'
  },
];
const Home = () => {
  return (
    <TabContainer>
      <View style={Styles.contentContainer}>
        <View style={{paddingLeft:20}}>
          <Text style={Styles.title1}>বিশেষ আইনি সমস্যা সমূহ</Text>
        </View>

        <FlatList
        contentContainerStyle={{padding:15}}
        style={{marginRight:0,maxHeight:200}}
        data={matters}
        renderItem={({item,index})=>(<View style={Styles.detailBox}>
              <Pressable style={{backgroundColor:'red',width:40,alignItems:'center',padding:3,borderRadius:10,alignSelf:'flex-end'}}><Text style={{fontSize:8,color:'white'}}>Online</Text></Pressable>
              <Text style={{fontSize:10,fontWeight:'bold',color:'#000',marginTop:7}}>{item.topic}</Text>
              <Text style={{fontSize:9,fontWeight:300,color:'#cf9410',marginTop:5}}>মাত্র {item.price} ৳</Text>
              <Pressable style={{width:70,backgroundColor:'black',marginTop:10,borderRadius:10,alignItems:'center',justifyContent:'center',padding:5,position:'absolute',bottom:5,left:5}}><Text style={{color:'white',fontSize:10}}>কল করুন</Text></Pressable>
            </View>)}
        keyExtractor={(item,index)=>item.id}
        horizontal={true}
        
        />             
        <View style={{paddingLeft:20}}>
          <Text style={Styles.title1}>আপনার নিকটবর্তী উকিলগন</Text>
        </View>
        <LawyerList />
      </View>
    </TabContainer>
  )
}

export default Home

const styles = StyleSheet.create({})