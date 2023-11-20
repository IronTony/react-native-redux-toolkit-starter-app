import env from '@env';
import React, { FC } from 'react';
import VersionNumber from 'react-native-version-number';
import { Text, YStack } from 'tamagui';

const EnvInfoView: FC = () => {
  return (
    <YStack marginTop={5}>
      {/* This is just to show you how to get values from the generated ENV file */}
      <Text fontSize="$3" textAlign="center" paddingVertical={5} color="$absestos">{`ENV: ${env.ENV}`}</Text>

      <Text
        fontSize="$3"
        textAlign="center"
        color="$absestos">{`v.${VersionNumber.appVersion}-${VersionNumber.buildVersion}`}</Text>
    </YStack>
  );
};

export default EnvInfoView;
