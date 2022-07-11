import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Flex, Icon, Pressable, ScrollView, Text } from 'native-base';
import React, { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalPage: FC = () => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <Text fontSize="20px" fontFamily="body" fontWeight={700}>
          {t('ModalPage:PageName')}
        </Text>
      ),
      headerRight: () => (
        <Flex flex={1} justifyContent="center">
          <Pressable onPress={goBack}>
            <Icon as={MaterialCommunityIcons} name="close" fontSize="24px" marginX="16px" />
          </Pressable>
        </Flex>
      ),
    });
  }, [goBack, setOptions, t]);

  return (
    <ScrollView
      _contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      backgroundColor="MIDNIGHT_BLUE">
      <Text color="CLOUDS" textAlign="center" fontFamily="body" fontStyle="normal">
        {t('ModalPage:thisIsAModal')}
      </Text>
    </ScrollView>
  );
};

export default ModalPage;
