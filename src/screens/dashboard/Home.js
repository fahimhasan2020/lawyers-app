import { StyleSheet, Text, View,ScrollView,Pressable,FlatList } from 'react-native'
import React,{useCallback, useEffect, useState} from 'react'
import TabContainer from '../../components/TabContainer'
import ZegoUIKitPrebuiltCallService from "@zegocloud/zego-uikit-prebuilt-call-rn"
import * as ZIM from "zego-zim-react-native"
import * as ZPNs from "zego-zpns-react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import getLawyerCaseListApi from '../../data/api/GetLawyerCaseListApi'
import { zegoVars } from '../../constants/zegoconbtrols'
import SingleCaseCard from '../../components/SingleCaseCard'
import Sizes from '../../themes/Sizes'
const Home = () => {
  const [caseList,setCaseList] = useState([]);
  const [refreshing,setRefreshing] = useState(false);
  useEffect(()=>{
    zegoInit();
    getCases();
  },[]);
  const getCases = async()=>{
    const casesList = await getLawyerCaseListApi();
    setCaseList(casesList);
  }
  const zegoInit = async()=>{
    const userId = await AsyncStorage.getItem('id');
    const firstName = await AsyncStorage.getItem('firstName');
    console.log("user id",userId);
    console.log("First name",firstName);
    ZegoUIKitPrebuiltCallService.init(
                    zegoVars?.appId,
                    zegoVars?.appSign,
                    'lawyer' + userId,
                    firstName
                      ? firstName
                      : 'Lawyer',
                    [ZIM, ZPNs],
                    {
                      appType: 1,
                      ringtoneConfig: {
                        incomingCallFileName: 'calling.mp3',
                        outgoingCallFileName: 'calling.mp3',
                      },
                      notifyWhenAppRunningInBackgroundOrQuit:true,
                      androidNotificationConfig: {
                        channelID: 'ZegoUIKit',
                        channelName: 'ZegoUIKit',
                      },
                    },
                  
                  ).then(() => {
                    ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
                      message:
                        'We need your consent for the following permissions in order to use the offline call function properly',
                      allow: 'Allow',
                      deny: 'Deny',
                    });
                  });
  }
  const handleRefresh = useCallback(() => {
    getCases();
  }, []);
  return (
    <TabContainer>
      <View style={styles.container}>
        <Text style={{color:'#000',fontSize:16,fontWeight:'bold',marginLeft:10}}>চলমান মামলাসমূহ</Text>
        <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={{paddingBottom:150}}
        showsVerticalScrollIndicator={false}
        data={caseList?.reverse()}
        renderItem={({item,index})=>(<SingleCaseCard caseData={item} />)}
        />
        <SingleCaseCard />
      </View>
      
    </TabContainer>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    height:Sizes.fullHeight,
    width:Sizes.fullWidth,
    marginTop:-150
  }
})