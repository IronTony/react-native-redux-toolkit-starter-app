import React from 'react';
import { Text, View } from 'react-native';
import VersionNumber from 'react-native-version-number';
import env from '@env';
import styles from './styles';

export function EnvInfoView() {
  return (
    <View>
      {/* This is just to show you how to get values from the generated ENV file */}
      <Text style={styles.infoText}>{`API: ${env.API_URL}`}</Text>

      <Text style={styles.infoText}>
        {`v.${VersionNumber.appVersion}-${VersionNumber.buildVersion}`}
      </Text>
    </View>
  );
}

export default EnvInfoView;
