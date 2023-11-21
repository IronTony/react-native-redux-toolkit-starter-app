import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { Route, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getUserDetailsRequest } from '@redux/actions';
import { userDetails, userDetailsLoading } from '@redux/reqres/selectors';
import { palette } from '@theme/colors';
import { FC, useCallback, useLayoutEffect } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, ScrollView, Text, YStack } from 'tamagui';

interface UserDetailsProps {
  userId: number;
}

const UserDetails: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const route = useRoute<Route<'UserDetails', UserDetailsProps>>();
  const { setOptions } = useNavigation();
  const goBack = useNavigationBackAction();
  const userId = route?.params?.userId;
  const detailsLoading = useSelector(userDetailsLoading);
  const userDetailsData = useSelector(userDetails);

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <Pressable onPress={goBack}>
          <MaterialIcons name="arrow-back-ios" color={palette.midnight_blue} size={14} />
        </Pressable>
      ),
      headerTitle: () => (
        <Text fontSize="$6" fontFamily="$body" color="$midnight_blue">
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
        backgroundColor="$wet_asphalt"
        contentContainerStyle={{
          padding: 15,
        }}
        showsVerticalScrollIndicator={false}>
        <Avatar circular size="$6">
          <Avatar.Image src={userDetailsData?.avatar} />
          {/* <Avatar.Fallback bc="red" /> */}
        </Avatar>

        <YStack paddingVertical={10} gap={10}>
          <Text color="$clouds" fontFamily="$body" fontStyle="normal" fontWeight="900" fontSize="$8">
            {`${userDetailsData?.first_name} ${userDetailsData?.last_name}`}
          </Text>

          <Text color="$clouds" fontFamily="$body" fontStyle="normal" fontSize="$7">
            {userDetailsData?.email}
          </Text>
        </YStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default UserDetails;
