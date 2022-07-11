import CToaster from '@components/CToaster';
import { messageHandlerReset } from '@redux/messageHandler/actions';
import { messageHandlerFullInfo } from '@redux/messageHandler/selectors';
import { RootStackScreen } from '@routes';
import { StatusBar, useToast } from 'native-base';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InnerApp: FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastIdRef = useRef();
  const hasGeneralMessage = useSelector(messageHandlerFullInfo);

  const onCloseToast = useCallback(() => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }, []);

  useEffect(() => {
    if (hasGeneralMessage?.message) {
      toastIdRef.current = toast.show({
        render: () => (
          <CToaster status={hasGeneralMessage?.status} title={hasGeneralMessage?.message} onClose={onCloseToast} />
        ),
        placement: 'top',
        onCloseComplete: () => dispatch(messageHandlerReset()),
        duration: 5000,
      });
    }
  }, [hasGeneralMessage, dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <RootStackScreen />
    </>
  );
};

export default InnerApp;
