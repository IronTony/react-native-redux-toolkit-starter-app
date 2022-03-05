import env from '@env';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import VersionNumber from 'react-native-version-number';
import styles from './styles';

const EnvInfoView: FC = () => {
  return (
    <View>
      {/* This is just to show you how to get values from the generated ENV file */}
      <Text style={styles.infoText}>{`ENV: ${env.ENV}`}</Text>

      <Text style={styles.infoText}>{`v.${VersionNumber.appVersion}-${VersionNumber.buildVersion}`}</Text>
    </View>
  );
};

export default EnvInfoView;
