import { DARK_THEME, LIGHT_THEME } from '@constants/theme';
import { messageHandlerReset } from '@redux/messageHandler/actions';
import { messageHandlerFullInfo } from '@redux/messageHandler/selectors';
import RootStackScreen from '@routes';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const colorScheme = useColorScheme() ?? LIGHT_THEME;
  const isDarkMode = colorScheme === DARK_THEME;
  const dispatch = useDispatch();
  const hasGeneralMessage = useSelector(messageHandlerFullInfo);

  useEffect(() => {
    if (hasGeneralMessage?.message) {
      Toast.show({
        position: 'top',
        onHide: () => dispatch(messageHandlerReset()),
        visibilityTime: 3000,
        topOffset: 60,
        type: hasGeneralMessage?.status,
        text1: hasGeneralMessage?.message,
        // text2: description.....
      });
    }
  }, [hasGeneralMessage, dispatch]);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <RootStackScreen />
    </>
  );
}

export default App;
