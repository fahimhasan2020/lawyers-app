import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Applications, CaseDetails, Categories, Chat, Checkout, Documents, Home, LawyerDetails, Login, Meetings, More, Notifications, PrivacyPolicy, Profile, Settings, Splash, Support, TermsAndConditions, Tutorial } from './src';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from "react-native-vector-icons/AntDesign"
import IonIcons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import { useNavigation } from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';
import LoadingBar from '../components/LoadingBar';
import AppStatusBar from '../components/AppStatusBar';
import FullPageLoader from '../components/FullPageLoader';
import Registration from '../screens/auth/Registration';
import Service from '../screens/dashboard/Service';
import {ZegoCallInvitationDialog,ZegoUIKitPrebuiltCallInCallScreen,ZegoUIKitPrebuiltCallWaitingScreen} from "@zegocloud/zego-uikit-prebuilt-call-rn"
function HomeTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { paddingTop: 10, paddingBottom: 20, height: 60,backgroundColor:'#fff',borderTopColor:'#fff',shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.9,
      shadowRadius: 16.00,
      elevation: 24},
      tabBarActiveTintColor: '#666765',
      tabBarInactiveTintColor: '#DDDDDC',
    }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <AntDesign name="home" size={20} color={color} />
              <Text style={{fontSize:8,fontWeight:'bold',color:color}}>হোম</Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <MaterialIcons name="category" size={20} color={color} />
              <Text style={{fontSize:8,fontWeight:'bold',color:color}}>ক্লাইন্টস</Text>
            </View>
          ),
        }}
        name="Categories"
        component={Categories}
      />
      <Tab.Screen
      listeners={{
        tabPress: e => {
          e.preventDefault();
            navigation.navigate('ChatScreen');
          
        },
      }}
      options={{
        tabBarIcon: ({ color, size }) => (
          <View
            style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <IonIcons name="chatbubble" size={20} color={color} />
            <Text style={{fontSize:8,fontWeight:'bold',color:color}}>চ্যাট</Text>
          </View>
        ),
      }}
      name="Chat" component={Chat} />
      <Tab.Screen 
      options={{
        tabBarIcon: ({ color, size }) => (
          <View
            style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <IonIcons name="menu" size={20} color={color} />
            <Text style={{fontSize:8,fontWeight:'bold',color:color}}>মেনু</Text>
          </View>
        ),
      }}
      listeners={{
        tabPress: e => {
          e.preventDefault();
          navigation.toggleDrawer();
          
        },
      }}
      name="More" component={More} />
    </Tab.Navigator>
  );
}
function HomeDrawer() {
  return (
      <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown:false,drawerPosition:'right',drawerStyle:{width:220}}} 
      
      initialRouteName="TabHome">
        <Drawer.Screen name="TabHome" component={HomeTabs} />
      </Drawer.Navigator>
  );
}
const transitionConfig = {
  gestureDirection: 'horizontal',
};
const customTransition = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 1,
          },
        ],
      },
    };
  },
};

const Stack = createStackNavigator();
const stackOptions = {
    headerShown: false,
    gestureEnabled: false,
}
const stackOptionsDifferent = {
    headerShown: false,
    gestureEnabled: false,
    cardStyleInterpolators:CardStyleInterpolators.forRevealFromBottomAndroid,
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 500,
        },
      },
      close: {
        animation: 'timing',
        config: {
          duration: 500, 
        },
      },
    },
}
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false,gestureEnabled:true,gestureDirection:'vertical'}}>
      <Stack.Screen name="TabsHome" component={HomeDrawer} />
      <Stack.Screen name="CaseDetails" component={CaseDetails} />
      <Stack.Screen name="Checkout" options={customTransition} component={Checkout} />
      <Stack.Screen name="Profile" options={customTransition} component={Profile} />
      <Stack.Screen name="Meetings" options={customTransition} component={Meetings} />
      <Stack.Screen name="Service" options={customTransition} component={Service} />
      <Stack.Screen name="Documents" options={customTransition} component={Documents} />
      <Stack.Screen name="Tutorial" options={customTransition} component={Tutorial} />
      <Stack.Screen name="Applications" options={customTransition} component={Applications} />
      <Stack.Screen name="Settings" options={customTransition} component={Settings} />
      <Stack.Screen name="TermsAndConditions" options={customTransition} component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" options={customTransition} component={PrivacyPolicy} />
      <Stack.Screen name="Notifications" options={customTransition} component={Notifications} />
      <Stack.Screen name="Support" options={customTransition} component={Support} />
      <Stack.Screen
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
      />
      <Stack.Screen
      options={{
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500, 
            },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
       name="ChatScreen" component={Chat} />
      <Stack.Screen
      options={{
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500, 
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 500,
            },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
       
       name="LawyerDetails" component={LawyerDetails} />
      
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />     
      <Stack.Screen name="Registration" component={Registration} />     
    </Stack.Navigator>
  );
}
const Index = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const loading = useSelector(state => state.auth.loading);
  const fullPageLoader = useSelector(state => state.auth.fullPageLoader);

  const showStatus = useSelector(state => state.statusstore.showStatus);
  const statusText = useSelector(state => state.statusstore.statusText);
  const statusColor = useSelector(state => state.statusstore.statusBarBackgroundColor);
  return <NavigationContainer theme={{ colors: { background: '#000000' } }}>
    <ZegoCallInvitationDialog />
    {loggedIn?<HomeStack />:<AuthStack />}
    {loading?<LoadingBar />:null}
    {showStatus?<AppStatusBar textDialog={statusText} color={statusColor} />:null}
    {fullPageLoader?<FullPageLoader />:null}
  </NavigationContainer>
}

export default Index

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: '#3498db',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  customItemContainer: {
    padding: 16,
  },
  customItemText: {
    fontSize: 16,
  },
})