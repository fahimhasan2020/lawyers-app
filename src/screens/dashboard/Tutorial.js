import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import DrawerContainer from '../../components/DrawerContainer';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants/colors';
import {BasicModalPopup} from '../../components/ModalsPopup';

const Tutorial = () => {
  return (
    <DrawerContainer>
      <View style={styles.container}>
        <View style={styles.nameConteiner}>
          <Text style={styles.name}>Tutorial</Text>
        </View>
        <View style={styles.tutorialContainer}>
          <Text style={styles.tutorialText}>Ukilvai is a lawyer consultancy platform that enables users to register using their phone numbers, making onboarding simple and secure. Upon entering their number, users receive a one-time password (OTP) for verification, after which they can complete their profile and begin exploring legal services. Once registered, users can browse a curated list of verified lawyers, each with detailed profiles showcasing their specialties, availability, experience, and consultation fees. Users can search and select a lawyer based on their specific legal needs, preferred consultation type—video, chat, or in-person—and availability.

To initiate a consultation, users are required to make a prepayment through an integrated payment gateway. Once the payment is successful, a consultation slot is booked and confirmed. For video consultations, the app offers secure, real-time video communication using embedded third-party video platforms, with scheduled sessions and reminders before the meeting begins. Chat consultations occur through an in-app messaging system that supports real-time text communication and the secure exchange of files and legal documents. Physical consultations are coordinated with calendar scheduling, including lawyer-provided location details and confirmation mechanisms such as manual check-ins or QR codes.

Throughout the process, the app ensures that users receive timely notifications and reminders about upcoming sessions, payment confirmations, and follow-up opportunities. After each consultation, users can leave feedback and rate their experience, helping to build a trustworthy environment. Lawyers also have access to tools for managing their availability, sessions, and communication with clients. All transactions and sessions are tracked for transparency and auditing, and the entire ecosystem is designed to maintain strict confidentiality, data encryption, and role-based access control to protect sensitive user information.

The backend administration panel allows platform managers to onboard and verify lawyers, monitor consultation logs, review transactions, and resolve disputes if they arise. Ukilvai ultimately serves as a complete, secure, and user-friendly platform</Text>
        </View>
      </View>
    </DrawerContainer>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  tutorialContainer:{
    paddingTop:120,
    paddingHorizontal:20
  },
  container: {
    flex: 1,
    marginTop: -200,
  },
  tutorialText:{
    fontSize:10,fontWeight:'400',color:'#000',textAlign:'justify'
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