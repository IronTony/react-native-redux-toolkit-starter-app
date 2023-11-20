import EnvInfoView from '@components/AppVersion';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { createUserRequest, deleteUserRequest, modifyUserRequest } from '@redux/actions';
import { palette } from '@theme/colors';
import React, { useCallback, FC, memo, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui';
import styles from './styles';

const Home: FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { setOptions } = useNavigation();
  const currentLocale = i18n.language;

  const switchLocaleToEn = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const switchLocaleToIt = useCallback(() => {
    i18n.changeLanguage('it');
  }, [i18n]);

  const onCreateUser = useCallback(() => {
    dispatch(createUserRequest({ name: 'John', job: 'some-title' }));
  }, [dispatch]);

  const onModifyUser = useCallback(() => {
    dispatch(modifyUserRequest({ userId: '666', name: 'Jil', job: 'some-title-edited' }));
  }, [dispatch]);

  const onDeleteUser = useCallback(() => {
    dispatch(deleteUserRequest({ userId: '999' }));
  }, [dispatch]);

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <></>,
      headerTitle: () => <FontAwesome5Icon name="react" color={palette.peter_river} size={20} />,
    });
  }, [setOptions]);

  return (
    <CSafeAreaView>
      <ScrollView backgroundColor="$wet_asphalt" contentContainerStyle={styles.ContentViewContainer}>
        <Text color="$white" fontFamily="$body" fontWeight="900" fontSize="$9" paddingBottom={20} textAlign="center">
          {t('Homepage:welcome')}
        </Text>
        <Text color="$white" fontFamily="$body" fontWeight="100" fontSize="$3" paddingBottom={20} textAlign="center">
          {t('Homepage:releasedWithLove')}
        </Text>

        <YStack flexDirection="row" marginBottom={20}>
          <Button
            backgroundColor={currentLocale === 'it' ? '$nephritis' : '$carrot'}
            onPress={switchLocaleToIt}
            margin={2}
            pressStyle={{
              backgroundColor: currentLocale === 'it' ? '$nephritis' : '$carrot',
            }}>
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('common:italian')}
            </Text>
          </Button>

          <Button
            backgroundColor={currentLocale === 'en' ? '$nephritis' : '$carrot'}
            onPress={switchLocaleToEn}
            margin={2}
            pressStyle={{
              backgroundColor: currentLocale === 'en' ? '$nephritis' : '$carrot',
            }}>
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('common:english')}
            </Text>
          </Button>
        </YStack>

        <Button
          onPress={() => navigation.navigate('MainStack', { screen: 'UsersList' })}
          backgroundColor="$sun_flower"
          marginBottom={5}>
          <XStack flexDirection="row" alignItems="center" gap={3}>
            <EvilIcons name="arrow-right" color={palette.white} size={20} />
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('Homepage:gotoUsersList')}
            </Text>
          </XStack>
        </Button>

        <Button onPress={onCreateUser} backgroundColor="$sun_flower" marginBottom={5}>
          <XStack flexDirection="row" alignItems="center" gap={3}>
            <EvilIcons name="arrow-right" color={palette.white} size={20} />
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('Homepage:createNewUser')}
            </Text>
          </XStack>
        </Button>

        <Button onPress={onModifyUser} backgroundColor="$sun_flower" marginBottom={5}>
          <XStack flexDirection="row" alignItems="center" gap={3}>
            <EvilIcons name="arrow-right" color={palette.white} size={20} />
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('Homepage:ModifyUser')}
            </Text>
          </XStack>
        </Button>

        <Button onPress={onDeleteUser} backgroundColor="$sun_flower" marginBottom={5}>
          <XStack flexDirection="row" alignItems="center" gap={3}>
            <EvilIcons name="arrow-right" color={palette.white} size={20} />
            <Text color="$white" fontFamily="$body" fontStyle="normal">
              {t('Homepage:DeleteUser')}
            </Text>
          </XStack>
        </Button>

        <Button
          alignSelf="center"
          backgroundColor="transparent"
          borderColor="$alizarin"
          borderWidth={1}
          marginTop={15}
          onPress={() => navigation.navigate('MyModal')}>
          <Text color="$white" fontFamily="$body" fontStyle="normal">
            {t('Homepage:openModal')}
          </Text>
        </Button>

        <EnvInfoView />
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Home);
