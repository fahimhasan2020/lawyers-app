import { googleApiKey } from "../constants/url";

export const getFormattedAddress = async (latitude, longitude) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (
      data.status === 'OK' &&
      data.results &&
      data.results.length > 0
    ) {
      return data.results[0].formatted_address;
    } else {
      console.warn('No address found:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};