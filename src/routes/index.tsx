import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '@scenes/Homepage';
import OtherPage from '@scenes/OtherPage';
import ModalPage from '@scenes/ModalPage';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

export const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName={'Home'}>
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="OtherPage"
        component={OtherPage}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MyModal"
        component={ModalPage}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
