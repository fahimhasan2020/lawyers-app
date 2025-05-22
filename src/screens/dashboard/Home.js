import { StyleSheet, Text, View,ScrollView,Pressable,FlatList } from 'react-native'
import React,{useEffect, useState} from 'react'
import TabContainer from '../../components/TabContainer'
import ZegoUIKitPrebuiltCallService from "@zegocloud/zego-uikit-prebuilt-call-rn"
import * as ZIM from "zego-zim-react-native"
import * as ZPNs from "zego-zpns-react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
const Home = () => {
  const zegoInit = async()=>{
    const userId = await AsyncStorage.getItem('id');
    const firstName = await AsyncStorage.getItem('firstName');
    ZegoUIKitPrebuiltCallService.init(
                    zegoVars?.appId,
                    zegoVars?.appSign,
                    'user' + userId,
                    firstName
                      ? firstName
                      : 'Lawyer',
                    [ZIM, ZPNs],
                    {
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
  return (
    <TabContainer>
      {/* <ZegoSendCallInvitationButton
            invitees={invitees.map((inviteeID) => {
              return { userID: inviteeID, userName: 'Fahim Hasan' };
            })}
            isVideoCall={true}
            resourceID={"zego_call"}
          /> */}
    </TabContainer>
  )
}

export default Home

const styles = StyleSheet.create({})