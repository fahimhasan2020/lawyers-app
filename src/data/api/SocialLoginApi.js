import { baseApi } from "../../constants/url";

export const socialLoginApi = async({email,firstName,lastName,profilePicture,pushToken})=>{
try{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({email:email,first_name:firstName,last_name:lastName,profile_picture:profilePicture,push_token:pushToken}),
    };

    const apiCall = await fetch(baseApi+"social/login", requestOptions);
    const apiResult = await apiCall.json();
    return apiResult;
}catch(e){
    return e;
}
    

}