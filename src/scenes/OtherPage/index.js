import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { setLocale } from '@redux/actions';
import styles from './styles';

function OtherPage() {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Trans style={styles.mainText} i18nKey="AnotherPage:welcome" />
      <Button
        onPress={() => dispatch(setLocale('it'))}
        title={t('Homepage:italian')}
      />
      <Button
        onPress={() => dispatch(setLocale('en'))}
        title={t('Homepage:english')}
      />
    </View>
  );
}

export default React.memo(withTranslation()(OtherPage));
