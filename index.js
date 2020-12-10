/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

// Remove YellowBox on Debug application screen
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);
