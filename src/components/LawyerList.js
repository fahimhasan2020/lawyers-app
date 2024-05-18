import { StyleSheet, Text, View,Image,FlatList,Pressable } from 'react-native'
import React from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import {useNavigation} from "@react-navigation/native"
import Animated,{SharedTransition,withSpring} from "react-native-reanimated"
import {
    SharedElement,
    SharedElementTransition,
    nodeFromRef
  } from 'react-native-shared-element';
const lawyers = [
    {
        id:'1',
        image:require('../assets/lawyer1.jpg'),
        speciality:'Divorce Lawyer',
        stars:'4.5 (147)',
        name:'Adv Monjur Alom',
        jobLocation:'Comilla Jouge Court',
        active:false
    },
    {
        id:'2',
        image:require('../assets/lawyer6.jpg'),
        speciality:'Women or Child abouse',
        stars:'5 (80)',
        name:'Adv Merina Sultana',
        jobLocation:'Dhaka Suprem Court',
        active:true
    },
    {
        id:'3',
        image:require('../assets/lawyer3.jpg'),
        speciality:'Criminal case',
        stars:'3.5 (225)',
        name:'Adv Rayhan Salehin',
        jobLocation:'Sylhet Jouge Court',
        active:false
    },
    {
        id:'4',
        image:require('../assets/lawyer4.jpg'),
        speciality:'Land matters',
        stars:'2.5 (17)',
        name:'Adv Md Mostal Ahmed',
        jobLocation:'Comilla Jouge Court',
        active:true
    },
    {
        id:'5',
        image:require('../assets/lawyer5.jpg'),
        speciality:'Tax Lawyer',
        stars:'5 (19)',
        name:'Adv Farhannur Chowdhury',
        jobLocation:'High Court',
        active:false
    },
    {
        id:'6',
        image:require('../assets/lawyer2.jpg'),
        speciality:'Property Inheritence',
        stars:'5 (85)',
        name:'Adv Md Jamal',
        jobLocation:'Jhinaidah Distict Court',
        active:true
    },
];
const transition = SharedTransition.custom((values) => {
    'worklet';
    return {
      height:withSpring(133),
      width: withSpring(200),
    };
  });
const LawyerList = () => {
    const navigation = useNavigation();
  return (
    <View  style={styles.listContainer}>
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        data={lawyers}
        renderItem={({item,index})=>(<Pressable
        onPress={()=>{
            navigation.navigate('LawyerDetails',{image:item.image,tag:'sharedTag'+item.id,datas:item});
        }}
        style={styles.card}>
        <Image
        source={item.image}
        style={styles.lawyerImage} />
        <View style={styles.overlay}>
        </View>
        <View style={styles.overlayContent}>
            <Text style={styles.lawyerName}>{item.speciality}</Text>
        </View>
        <View style={styles.overlayContentTop}>
            <Entypo name="heart-outlined" size={20} color={'#ccc'} />
            <View style={styles.starContainer}>
                <Text style={styles.ratingText}>{item.stars}</Text>
                <Entypo name="star" size={15} color={'#FFD700'} />
            </View>
        </View>

      </Pressable>)}
        />
      
    </View>
  )
}

export default LawyerList

const styles = StyleSheet.create({
    listContainer:{
        paddingTop:10,
        paddingBottom:10,
    },
    card:{
        height:150,
        width:250,
        backgroundColor:'black',
        marginLeft:20,
        borderRadius:8,
        shadowColor: "#000",margin:10,
    shadowOffset: {
        width: 0,
        height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    },
    lawyerImage:{
        height:150,
        width:250,
        borderRadius:8
    },
    overlay:{
        backgroundColor:'rgba(0,0,0,0.6)',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        height:150,
        width:250,
        borderRadius:8
    },
    overlayContent:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        height:50,
        width:250,
        padding:10
    },
    overlayContentTop:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:50,
        width:250,
        padding:10,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    starContainer:{
        flexDirection:'row'
    },
    lawyerName:{
        color:'#ccc',
        textTransform:'uppercase',
        fontSize:15
    },
    ratingText:{
        color:'#ccc',
        fontSize:10,
        fontWeight:'bold',
        marginTop:1,
        marginRight:5
    }
})