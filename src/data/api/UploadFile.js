import ApiService from "../../utility/apiServices";
import { fireMessage } from "../../utility/flashMessageFire";

export const uploadFileToServer = async(path, mimeType)=>{
    try{
        const fileName = path.split('/').pop();
        const formData = new FormData();
        const myBlob = {
            uri: path,
            type: mimeType,
            name: fileName,
        };
        formData.append('image', myBlob);
        const result = await ApiService.post('data-update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(result?.isSuccess){
            return result?.url;
        }else{
            fireMessage("Invalid file upload try different one","danger");
            return "";
        }
    }catch(e){
        console.log("what",e);
        fireMessage("Invalid file upload try different one","danger");
        return "";
    }
}