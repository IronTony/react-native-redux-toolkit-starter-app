import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

/**
 * An empty component used to manage SplashScreen from Suspense fallback
 */
const Splashscreen = () => {
  useEffect(() => {
    return () => {
      // Hide Splashscreen when Fallback get willUnmount
      SplashScreen.hide();
    };
  });

  return null;
};

export default React.memo(Splashscreen);
