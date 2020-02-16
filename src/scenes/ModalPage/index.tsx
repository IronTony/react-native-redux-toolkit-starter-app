import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import GenericModal from '@components/GenericModal';
import styles from './styles';

const ModalPage = () => {
  const [t] = useTranslation();

  return (
    <GenericModal pageTitle={t('ModalPage:PageName')}>
      <View>
        <Text style={styles.mainText}>{t('ModalPage:thisIsAModal')}</Text>
      </View>
    </GenericModal>
  );
};

export default ModalPage;
