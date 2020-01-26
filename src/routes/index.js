import { createAppContainer } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import Homepage from '@scenes/Homepage';
import OtherPage from '@scenes/OtherPage';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Homepage,
    },
    AnotherPage: {
      screen: OtherPage,
    },
  },
  {
    defaultNavigationOptions: {
      // this is to have a RTL transition on both systems
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
