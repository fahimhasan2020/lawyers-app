import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseApi, baseApiUser} from '../../constants/url';

export const getUserDetailsApi = async ({id}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const apiCall = await fetch(baseApiUser + 'user/details/'+id, requestOptions);
    
    const apiResult = await apiCall.json();
    return apiResult;
  } catch (e) {
    return e;
  }
};

export default getUserDetailsApi;