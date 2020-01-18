import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homepage from '@scenes/Homepage';
import OtherPage from '@scenes/OtherPage';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Homepage,
  },
  AnotherPage: {
    screen: OtherPage,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
