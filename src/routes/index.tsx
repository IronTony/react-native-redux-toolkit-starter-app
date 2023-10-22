import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList, MainStackScreen } from '@routes/stacks/MainStack';
import React from 'react';

export type RootStackParamList = {
  MainStack: NavigatorScreenParams<MainStackParamList>; // Assuming 'MainStack' is the name of the screen in your MainStackScreen
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootStackScreen() {
  return (
    <RootStack.Navigator screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen
        name="MainStack"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <RootStack.Screen
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
      /> */}
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
