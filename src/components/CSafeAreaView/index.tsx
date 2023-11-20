import React, { FC, ReactNode } from 'react';
import { YStack } from 'tamagui';

interface CSafeAreaViewProps {
  children: ReactNode;
}

const CSafeAreaView: FC<CSafeAreaViewProps> = ({ children }) => {
  return (
    <YStack flex={1} width="100%" height="100%">
      {children}
    </YStack>
  );
};

export default CSafeAreaView;
