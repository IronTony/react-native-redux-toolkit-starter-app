import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { Button } from '@ui-kitten/components';
import { setLocale } from '@redux/actions';
import styles from './styles';

function OtherPage() {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Trans style={styles.mainText} i18nKey="AnotherPage:welcome" />
      <View style={styles.languangeContainer}>
        <Button
          onPress={() => dispatch(setLocale('it'))}
          style={styles.button}
          status="primary"
        >
          {t('common:italian')}
        </Button>
        <Button
          onPress={() => dispatch(setLocale('en'))}
          style={styles.button}
          status="basic"
        >
          {t('common:english')}
        </Button>
      </View>
    </View>
  );
}

export default React.memo(withTranslation()(OtherPage));
