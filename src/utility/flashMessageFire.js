import { showMessage, hideMessage } from "react-native-flash-message";
export const fireMessage = (message,type)=>{
    showMessage({
        message: message,
        type: type,
        position:'bottom',
        icon:'auto'
      });
}