import * as React from 'react';
import { useCallback, FC, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFilmsRequest } from '@redux/actions';
import { allFilms } from '@redux/ghibli/selectors';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
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
    <NHCSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('AnotherPage:OtherPage')} />

      <FlatList
        data={allMovies}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </NHCSafeAreaView>
  );
};

export default React.memo(OtherPage);
