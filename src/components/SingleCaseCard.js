import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const SingleCaseCard = ({caseData}) => {
    const navigation = useNavigation();
    const formatSQLDateTime =(sqlDateTime)=> {
        const date = new Date(sqlDateTime);
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        };
        const timeStr = date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        const day = date.toLocaleDateString('en-US', { day: '2-digit' });
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${timeStr} ${day} ${month} ${year}`;
      }
    const onPressRedirect = ()=>{
        navigation.navigate('CaseDetails',caseData);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{caseData?.category}</Text>
            <Text style={styles.price}>{caseData?.amount} BDT</Text>
            <Text style={styles.dateTime}>{formatSQLDateTime(caseData?.created_at)}</Text>
            <Pressable onPress={onPressRedirect} style={styles.pressable}><Text style={styles.pressableText}>View Details</Text></Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding:10,
        borderRadius:5,
        height:100,
        width:'95%',
        marginHorizontal:10,
        marginVertical:10,
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
            },
    title:{
        color:'#000',
        fontSize:20,
    },
    price:{
        color:'#202120',
        fontSize:12, 
    },
    dateTime:{
        color:'#343635',
        fontSize:12, 
    },
    pressable:{
        marginTop:10,
        alignSelf:'flex-end'
    },
    pressableText:{
        color:'orange',
        fontSize:12,
        textDecorationStyle:'solid',
        textDecorationLine:'underline'
    }
});


export default SingleCaseCard;
