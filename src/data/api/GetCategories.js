import { baseApiUser } from "../../constants/url";
import ApiService from "../../utility/apiServices";

export const getCategories = async()=>{
    let categoryList = [];
    try{
        const categories = await ApiService.get('category/list',{
            baseURL:baseApiUser
        });
        categoryList = categories;
        return categoryList;
    }catch(e){
        console.log(e);
        return categoryList;
    }
}