import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, FC, ReactNode } from 'react';
import { Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, Text } from 'tamagui';

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
          <Text color="$alizarin" fontFamily="$body" fontStyle="normal" fontSize="$5" textAlign="center">
            {pageTitle}
          </Text>
        }
        RightAction={
          <Pressable onPress={closeModal} style={{ marginRight: 10 }}>
            <MaterialCommunityIcons name="close" size={24} />
          </Pressable>
        }
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        backgroundColor="$midnight_blue">
        {children}
      </ScrollView>
    </CSafeAreaView>
  );
};

export default ModalPage;
