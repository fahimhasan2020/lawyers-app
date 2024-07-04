import { baseApi } from "../../constants/url";
import ApiService from "../../utility/apiServices";
import { fireMessage } from "../../utility/flashMessageFire";
export const registerApiCall = async(data)=>{
    try{
       const response = await ApiService.post("registration",data);
       return response;
    }catch(e){
        console.log(e);
        fireMessage("Request failed. Try again later","danger");
    }
}

export default registerApiCall;