import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import ModalPage from '@scenes/ModalPage';
import customTheme from '@theme';
import React, { FC } from 'react';
import { routeOverlayOption } from './routeOptions';
import { MainStackScreen } from './stacks/MainStack';

const RootStack = createStackNavigator();

export const RootStackScreen: FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ presentation: 'modal', ...routeOverlayOption }}>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MyModal"
        component={ModalPage}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => <></>,
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </RootStack.Navigator>
  );
};
