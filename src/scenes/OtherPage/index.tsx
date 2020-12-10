import React, { useCallback, FC, useEffect } from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container } from 'native-base';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilmsRequest } from '@redux/actions';
import { allFilms } from '@redux/ghibli/selectors';
import GenericHeader from '@components/GenericHeader';
import styles from './styles';

const OtherPage: FC = () => {
  const dispatch = useDispatch();
  const allMovies = useSelector(allFilms);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const popAction = useCallback(() => StackActions.pop(), []);

  const goBack = useCallback(() => {
    navigation.dispatch(popAction);
  }, [navigation, popAction]);

  useEffect(() => {
    dispatch(getAllFilmsRequest({ limit: 30 }));
  }, [dispatch]);

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item.key}>
        <Text style={styles.mainText}>{item.title}</Text>
      </View>
    ),
    [],
  );

  return (
    <Container style={styles.container}>
      <GenericHeader onBackClicked={goBack} pageName={t('AnotherPage:OtherPage')} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.container}>
          <FlatList data={allMovies} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default React.memo(OtherPage);
