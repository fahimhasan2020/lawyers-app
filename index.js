import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/lang/i18';
import { Settings } from 'react-native-fbsdk-next';
Settings.initializeSDK();
Settings.setAppID('1217272612240461');
AppRegistry.registerComponent(appName, () => App);
