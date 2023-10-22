import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef<ParamListBase>>();
export const isMountedRef = createRef<boolean>();

type NavigateProps = {
  (name: keyof ParamListBase, params?: ParamListBase[keyof ParamListBase]): void;
};

// Use this function to navigate to specific page when you are not using a component
export const navigate: NavigateProps = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};
