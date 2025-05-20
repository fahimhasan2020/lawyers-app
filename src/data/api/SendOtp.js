import { baseApi } from "../../constants/url";

export const senOtpApiCall = async({phoneNumber=''})=>{
    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({phoneNumber:phoneNumber}),
        };

        const apiCall = await fetch(baseApi+"initiate/lawyer", requestOptions);
        const apiResult = await apiCall.json();
        return apiResult;
    }catch(e){
        return e;
    }
    
    
}

export default senOtpApiCall;