import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TabContainer from '../../components/TabContainer'
import { useNavigation } from '@react-navigation/native';
import getOrderHistoryApi from '../../data/api/GetOrderHistory';
import FullPageLoader from '../../components/FullPageLoader';

const Categories = () => {
  const navigation = useNavigation();
    const [historyList,setHistoryList] = useState([]);
    const [apiCalling,setApiCalling] = useState(false);
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
    useEffect(()=>{
      fetchOrderHistory()
    },[])
    const fetchOrderHistory = async()=>{
      setApiCalling(true)
      const history = await getOrderHistoryApi();
      if(history){
          setHistoryList(history);
      }
      setApiCalling(false)
    }
  return (
    <TabContainer>
      <View style={styles.container}>
      {apiCalling?<FullPageLoader />:<FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:250}}
        ListEmptyComponent={()=>(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#000'}}>No item available</Text></View>)}
        data={historyList}
        renderItem={({item,index})=>(<Pressable
        style={styles.cardHistory}>
            <Image source={{uri:item?.user?.profile_picture}} style={{height:50,width:50,borderRadius:25,marginRight:10}} />
            <View>
              <Text style={styles.titleOne}>{item?.type}</Text>
            <Text style={styles.titleOne}>{item?.user?.first_name} {item?.user?.last_name}</Text>
            <Text style={styles.titleThree}>{formatSQLDateTime(item?.created_at)}</Text>
            <Text style={styles.titleFour}>{item?.amount} BDT</Text>
            </View>
            
        </Pressable>)}
        />}
      </View>
    </TabContainer>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    marginTop:-150
  },
  cardHistory:{
    marginHorizontal:10,
    flexDirection:'row',
    marginBottom:10,
    width:'90%',
    height:120,
    backgroundColor:'#fff',
    elevation:3,
    padding:10,
    borderRadius:5
},
titleOne:{
    fontSize:20,
    color:'orange',
    fontWeight:'800'
},
titleTwo:{
    fontSize:16,
    color:'#000',
    fontWeight:'500'
},
titleThree:{
    fontSize:14,
    color:'#2d2d2d',
    fontWeight:'500'
},
titleFour:{
    fontSize:14,
    color:'#2d2d2d',
    marginTop:10,
    fontWeight:'500'
}
})