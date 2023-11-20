import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUsersListRequest } from '@redux/actions';
import {
  allUsers,
  allUsersLoading,
  usersListCurrentPage,
  usersListTotalPages, // usersListTotalResults,
} from '@redux/reqres/selectors';
import { User } from '@redux/reqres/types';
import { palette } from '@theme/colors';
import { isEmpty, isUndefined } from 'lodash';
import * as React from 'react';
import { useCallback, FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Text, XStack, YStack } from 'tamagui';

const UsersList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { setOptions } = useNavigation();
  const goBack = useNavigationBackAction();
  const onUsersListLoading = useSelector(allUsersLoading);
  const usersList = useSelector(allUsers);
  const currentPage = useSelector(usersListCurrentPage);
  const totalPages = useSelector(usersListTotalPages);
  // const totalResults = useSelector(usersListTotalResults);

  const onGotoUserDetails = useCallback(
    (userId: number) => {
      navigation.navigate('MainStack', {
        screen: 'UserDetails',
        params: {
          userId,
        },
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <Pressable onPress={() => onGotoUserDetails(item?.id)}>
        <YStack flex={1} flexDirection="row" paddingVertical={10} key={item.id} alignItems="center" gap={10}>
          <Avatar circular size="$6">
            <Avatar.Image src={item?.avatar} />
            {/* <Avatar.Fallback bc="red" /> */}
          </Avatar>

          <Text
            color="$clouds"
            fontFamily="$body"
            fontStyle="normal"
            fontWeight="900"
            fontSize="$6">{`${item.first_name} ${item.last_name}`}</Text>
        </YStack>
      </Pressable>
    ),
    [onGotoUserDetails],
  );

  const loadMoreUsers = useCallback(() => {
    if (!isEmpty(usersList)) {
      const nextOffset = currentPage + 1;
      if (!isUndefined(totalPages) && currentPage < totalPages) {
        dispatch(getUsersListRequest({ pageParam: nextOffset, per_page: 10 }));
      }
    }
  }, [currentPage, dispatch, totalPages, usersList]);

  const onLoadUsersList = useCallback(() => {
    dispatch(getUsersListRequest({ pageParam: 1, per_page: 10 }));
  }, [dispatch]);

  const onRefreshLists = useCallback(() => {
    onLoadUsersList();
  }, [onLoadUsersList]);

  useFocusEffect(
    useCallback(() => {
      onLoadUsersList();
    }, [onLoadUsersList]),
  );

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <XStack flex={0} justifyContent="center">
          <Pressable onPress={goBack}>
            <MaterialIcons name="arrow-back-ios" color={palette.midnight_blue} size={14} />
          </Pressable>
        </XStack>
      ),
      headerTitle: () => (
        <Text fontSize="$6" fontFamily="$body" color="$midnight_blue">
          {t('UsersList:UsersList')}
        </Text>
      ),
    });
  }, [goBack, setOptions, t]);

  return (
    <CSafeAreaView>
      {/* {onUsersListLoading && <CLoader fullPage />} */}

      <FlatList
        data={usersList}
        style={{
          backgroundColor: palette.midnight_blue,
        }}
        contentContainerStyle={{
          padding: 15,
        }}
        renderItem={renderItem}
        onRefresh={onRefreshLists}
        refreshing={onUsersListLoading}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={onUsersListLoading ? <CLoader size={20} /> : null}
        initialNumToRender={10}
        windowSize={1}
      />
    </CSafeAreaView>
  );
};

export default React.memo(UsersList);
