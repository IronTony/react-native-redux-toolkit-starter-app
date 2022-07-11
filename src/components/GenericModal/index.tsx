import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Icon, Pressable, ScrollView, Text } from 'native-base';
import React, { useCallback, FC, ReactNode } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IModalPage {
  children: ReactNode;
  pageTitle: string;
}

const ModalPage: FC<IModalPage> = ({ children, pageTitle }) => {
  const navigation = useNavigation();
  const popAction = useCallback(() => StackActions.pop(), []);

  const closeModal = useCallback(() => {
    navigation.dispatch(popAction);
  }, [navigation, popAction]);

  return (
    <CSafeAreaView>
      <GenericHeader
        BodyHeader={
          <Text color="ALIZARIN" fontFamily="body" fontStyle="normal" fontSize="xl" textAlign="center">
            {pageTitle}
          </Text>
        }
        RightAction={
          <Pressable onPress={closeModal}>
            <Icon as={MaterialCommunityIcons} name="close" fontSize={24} marginRight={10} />
          </Pressable>
        }
      />
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        backgroundColor="MIDNIGHT_BLUE">
        {children}
      </ScrollView>
    </CSafeAreaView>
  );
};

export default ModalPage;
