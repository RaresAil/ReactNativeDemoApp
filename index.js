/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
FontAwesome.loadFont();
MaterialIcons.loadFont();
Ionicons.loadFont();

AppRegistry.registerComponent(appName, () => App);
