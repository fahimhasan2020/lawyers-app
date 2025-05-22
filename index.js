import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/lang/i18';
import { Settings } from 'react-native-fbsdk-next';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);
Settings.initializeSDK();
Settings.setAppID('1217272612240461');
AppRegistry.registerComponent(appName, () => App);
