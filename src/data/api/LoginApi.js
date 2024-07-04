import { baseApi } from "../../constants/url";

export const loginApiCall = async({phoneNumber='',push_token=''})=>{
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({phone_number:phoneNumber,push_token:push_token}),
        };

        const apiCall = await fetch(baseApi+"login", requestOptions);
        const apiResult = await apiCall.json();
        return apiResult;
    }catch(e){
        return e;
    }
    
    
}

export default loginApiCall;