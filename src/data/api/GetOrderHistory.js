import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseApi, baseApiUser} from '../../constants/url';

export const getOrderHistoryApi = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('id');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const apiCall = await fetch(
      baseApiUser + 'get/appointments/lawyers/' + userId,
      requestOptions,
    );
    const apiResult = await apiCall.json();
    return apiResult;
  } catch (e) {
    return e;
  }
};

export default getOrderHistoryApi;