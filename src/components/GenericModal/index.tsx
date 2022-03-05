import GenericHeader from '@components/GenericHeader';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import React, { useCallback, FC, ReactNode } from 'react';
import { TouchableOpacity, ScrollView, Text } from 'react-native';
import styles from './styles';

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
    <NHCSafeAreaView>
      <GenericHeader
        BodyHeader={<Text style={styles.pageTitle}>{pageTitle}</Text>}
        RightAction={
          <TouchableOpacity onPress={closeModal}>
            <Icon pack="MaterialCommunityIcons" name="close" style={styles.headerIconContent} />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.content} style={styles.container}>
        {children}
      </ScrollView>
    </NHCSafeAreaView>
  );
};

export default ModalPage;
