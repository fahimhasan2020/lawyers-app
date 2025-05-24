import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    return null;
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        console.log('Location Error:', error);
        reject(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  });
};

const requestLocationPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const status = await check(permission);

  if (status === RESULTS.GRANTED) {
    return true;
  }

  if (status === RESULTS.DENIED) {
    const newStatus = await request(permission);
    return newStatus === RESULTS.GRANTED;
  }

  if (status === RESULTS.BLOCKED) {
    openSettings().catch(() => console.log('Cannot open settings'));
    return false;
  }

  return false;
};