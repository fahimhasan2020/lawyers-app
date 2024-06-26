import { StyleSheet, Text, View, Image,Pressable,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Container from '../../components/Container'
import DrawerContainer from '../../components/DrawerContainer'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../constants/colors'
import { BasicModalPopup } from '../../components/ModalsPopup'

const PrivacyPolicy = () => {
  return (<DrawerContainer>
    <View style={styles.container}>
      <View style={styles.nameConteiner}>
        <Text style={styles.name}>Privacy Policy</Text>
      </View>
      <View style={styles.navigationsContainer}>
      <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
          <Text style={styles.navigationText}>Privacy Policy for ukilvai {'\n'}  At ukilvai.com, accessible from https://ukilvai.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ukilvai.com and how we use it.

          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

          This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ukilvai.com. This policy is not applicable to any information collected offline or via channels other than this website. {'\n'}Concent {'\n'} 
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          {'\n'} Information we collect {'\n'}
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

          When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          {'\n'}How we use your information {'\n'}We use the information we collect in various ways, including to:

          Provide, operate, and maintain our website
          Improve, personalize, and expand our website
          Understand and analyze how you use our website
          Develop new products, services, features, and functionality
          Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
          Send you emails
          Find and prevent fraud

          {'\n'} Log Files {'\n'} ukilvai.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. {'\n'} Cookies and Web Beacons {'\n'} Like any other website, ukilvai.com uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information. {'\n'} Advertising Partners Privacy Policies {'\n'} You may consult this list to find the Privacy Policy for each of the advertising partners of ukilvai.com.

          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ukilvai.com, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.

          Note that ukilvai.com has no access to or control over these cookies that are used by third-party advertisers. {'\n'}Third Party Privacy Policies {'\n'} ukilvai.com's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.

          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites. {'\n'} CCPA Privacy Rights (Do Not Sell My Personal Information) {'\n'} Under the CCPA, among other rights, California consumers have the right to:

          Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.

          Request that a business delete any personal data about the consumer that a business has collected.

          Request that a business that sells a consumer's personal data, not sell the consumer's personal data.

          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. {'\n'} GDPR Data Protection Rights{'\n'} We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

          The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.

          The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.

          The right to erasure – You have the right to request that we erase your personal data, under certain conditions.

          The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.

          The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.

          The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us. {'\n'} Children's Information {'\n'} Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.

          ukilvai.com does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</Text>
        </ScrollView>
      </View>
    </View>
  </DrawerContainer>)
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-200
    },
    navigationText:{
      fontWeight:'bold',
      fontSize:12,
      opacity:0.5,
      color:'#000'
    },
    menus:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:15
    },
    navigationsContainer:{
      alignSelf:'center',
      width:'70%',
      padding:10,
      borderRadius:10,
      margin:10,
      marginTop:50,
      backgroundColor:'#ffffff',
      elevation:20
    },
    nameConteiner:{
      alignSelf:'center',
      padding:10
    },
    name:{
      fontSize:14,
      color:'orange',
      fontWeight:'bold',
      textTransform:'uppercase',
      
    },
    phone:{
      fontSize:10,
      color:'grey',
      fontWeight:'bold',
      textTransform:'uppercase',
      letterSpacing:0.3,
      opacity:0.6,
      alignSelf:'center'
    },
    avatar:{
      height:80,width:80,
    },

    avatarContainer:{
      padding:10,
      backgroundColor:'#fff',
      width:100,
      height:100,
      borderRadius:50,
      alignSelf:'center',
      elevation:10
    }
})