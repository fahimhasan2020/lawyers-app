const { default: ApiService } = require("../../utility/apiServices")

const updatePayload = async(token)=>{
   let output = null;
   try{
    const data = {
        token : token
       }
       const datas = await ApiService.post('token/verify',data);
       if(datas?.hasOwnProperty("user")){
        output = datas;
       }  
       return output;
   }catch(e){
    console.log(e);
    return output;
   }
   
}

export default updatePayload;