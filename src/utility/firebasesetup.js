import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const firebasesetup = async() => {
    if(requestUserPermission()){
        await messaging().registerDeviceForRemoteMessages();
    const pushToken = await messaging().getToken();
    console.log("push token",pushToken);
    messaging().subscribeToTopic('common-group');
    AsyncStorage.setItem("pushToken",pushToken);
    }   
}
const requestUserPermission=async()=> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      return true
    } else {
      return false
    }
  }
