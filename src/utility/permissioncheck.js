import {check, PERMISSIONS, RESULTS,request} from 'react-native-permissions';
export const  permissionCheck =(permissionName)=>{
    check(permissionName)
    .then((result) => {
        switch (result) {
        case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
        case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            request(permissionName).then((result) => {
                console.log(result);
              })
            return true;
        case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            request(permissionName).then((result) => {
                console.log(result);
              })
            return true;
        case RESULTS.GRANTED:
            console.log('Granted');
            return true;
        case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            return false;
        }
  })
  .catch((error) => {
    console.log(error);
  });
}