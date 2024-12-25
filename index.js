/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
// import App from './App';
import {Text, TextInput} from 'react-native';
import {name as appName} from './app.json';
import './src/translation/i18n';
import messaging from '@react-native-firebase/messaging';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

LogBox.ignoreAllLogs(true);
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
