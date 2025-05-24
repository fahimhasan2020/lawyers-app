import { googleApiKey, googleSearchApiEndPoint } from "../constants/url";

export const getPlacePredictions = async (inputText) => {
  if (!inputText || inputText.trim() === '') return [];

  try {
    const url = `${googleSearchApiEndPoint}?input=${encodeURIComponent(
      inputText
    )}&key=${googleApiKey}&types=geocode&language=en`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.predictions) {
      return data.predictions;
    } else {
      console.warn('Prediction API Error:', data.status);
      return [];
    }
  } catch (error) {
    console.error('Place prediction error:', error);
    return [];
  }
};