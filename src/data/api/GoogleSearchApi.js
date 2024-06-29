import { baseApi,googleSearchApiEndPoint,googleApiKey, googleCoordsApiEndPoint } from "../../constants/url"

export const googleSearch = async(value)=>{
    const url = googleSearchApiEndPoint+`?input=${encodeURIComponent(value)}&key=${googleApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data?.predictions;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
}

export const googleCoordinate = async(value)=>{
    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const url = googleCoordsApiEndPoint+`?place_id=${value}&key=${googleApiKey}`;
    try {
            const response = await fetch(url);
            const data = await response.json();    
            const location = data.result.geometry.location;
            return { lat: location.lat, lng: location.lng };
        } catch (error) {
            console.log('Error fetching location details:', error);
            return null;
        } 
}