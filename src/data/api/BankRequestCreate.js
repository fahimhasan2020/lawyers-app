import ApiService from "../../utility/apiServices"

export const bankRequestCreate =async(data)=>{
    try{
      const cashout = await ApiService.post("cashout/request",data);
      console.log("out",cashout);
      return cashout;
    }catch(e){
        console.log(e);
        return null
    }
}