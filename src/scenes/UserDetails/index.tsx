import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { Route, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getUserDetailsRequest } from '@redux/actions';
import { userDetails, userDetailsLoading } from '@redux/reqres/selectors';
import { GenericNavigationProps } from '@routes/types';
import { Avatar, Flex, Icon, Pressable, ScrollView, Text } from 'native-base';
import { FC, useCallback, useLayoutEffect } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

interface UserDetailsProps {
  userId: number;
}

const UserDetails: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const route = useRoute<Route<'UserDetails', UserDetailsProps>>();
  const { setOptions } = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();
  const userId = route?.params?.userId;
  const detailsLoading = useSelector(userDetailsLoading);
  const userDetailsData = useSelector(userDetails);

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <Pressable onPress={goBack}>
          <Icon as={MaterialIcons} name="arrow-back-ios" color="MIDNIGHT_BLUE" size="24px" />
        </Pressable>
      ),
      headerTitle: () => (
        <Text fontSize="20px" fontFamily="body" fontWeight={700}>
          {t('UserDetails:UserDetails')}
        </Text>
      ),
    });
  }, [goBack, setOptions, t]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        dispatch(getUserDetailsRequest({ userId }));
      }
    }, [dispatch, userId]),
  );

  return (
    <CSafeAreaView>
      {detailsLoading && <CLoader fullPage />}

      <ScrollView
        backgroundColor="pageBackground"
        _contentContainerStyle={{
          padding: '15px',
        }}
        showsVerticalScrollIndicator={false}>
        <Avatar source={{ uri: userDetailsData?.avatar }} size="lg" />
        <Flex>
          <Text color="CLOUDS" fontFamily="body" fontStyle="normal" fontSize="md" paddingY="10px">
            {`${userDetailsData?.first_name} ${userDetailsData?.last_name}`}
          </Text>
        </Flex>
        <Text color="CLOUDS" fontFamily="body" fontStyle="normal" fontSize="md" paddingY="10px">
          {userDetailsData?.email}
        </Text>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default UserDetails;
