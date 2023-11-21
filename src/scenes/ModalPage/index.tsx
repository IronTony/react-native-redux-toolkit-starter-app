import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, Stack, Text } from 'tamagui';

const ModalPage: FC = () => {
  const { t } = useTranslation();
  const { setOptions } = useNavigation();
  const goBack = useNavigationBackAction();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: () => (
        <Text fontSize="$4" fontFamily="$body" fontWeight="700">
          {t('ModalPage:PageName')}
        </Text>
      ),
      headerRight: () => (
        <Stack justifyContent="center">
          <Pressable onPress={goBack}>
            <MaterialCommunityIcons name="close" /*fontSize="24px" marginX="16px"*/ />
          </Pressable>
        </Stack>
      ),
    });
  }, [goBack, setOptions, t]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      backgroundColor="$midnight_blue">
      <Text color="$clouds" textAlign="center" fontFamily="$body" fontStyle="normal">
        {t('ModalPage:thisIsAModal')}
      </Text>
    </ScrollView>
  );
};

export default ModalPage;
