import GenericModal from '@components/GenericModal';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import styles from './styles';

const ModalPage: FC = () => {
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
