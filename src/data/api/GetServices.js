import ApiService from "../../utility/apiServices"

export const getServicesList = async(id)=>{
    let services = [];
    try{
       const serviceList =await ApiService.get("service/lawyer/"+id);
       services = serviceList;
       return services;
    }catch(e){
        console.log(e);
        services;
    }
}