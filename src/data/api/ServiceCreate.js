import ApiService from "../../utility/apiServices"

export const serviceCreateApi = async(data = null)=>{
    try{
       const createService = await ApiService.post('service',data);
       return createService;
    }catch(e){
        console.log(e);
        return null;
    }
}
export const serviceEditApi = async(data = null)=>{
    try{
       const createService = await ApiService.put('service/'+data?.id,data);
       return createService;
    }catch(e){
        console.log(e);
        return null;
    }
}