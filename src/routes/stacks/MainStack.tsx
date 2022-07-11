import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Homepage from '@scenes/Homepage';
import UserDetails from '@scenes/UserDetails';
import UsersList from '@scenes/UsersList';
import customTheme from '@theme';
import { FC } from 'react';
import * as React from 'react';

const MainStack = createStackNavigator();

export const MainStackScreen: FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UsersList"
        component={UsersList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};
