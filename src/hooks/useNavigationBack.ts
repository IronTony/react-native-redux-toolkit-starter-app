import { StackActions, useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';

export const useNavigationBackAction = (count = 1): (() => void) => {
  const navigation = useNavigation();

  const goBack = useCallback(() => {
    const popAciton = StackActions.pop(count);
    navigation.dispatch(popAciton);
  }, [count, navigation]);

  return goBack;
};
