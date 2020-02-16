import { createRef } from 'react';

export const navigationRef = createRef();
export const isMountedRef = createRef();

// Use this function to navigate to specific page when you are using Redux-Saga
export const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};
