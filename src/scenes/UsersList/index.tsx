import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUsersListRequest } from '@redux/actions';
import {
  allUsers,
  allUsersLoading,
  usersListCurrentPage,
  usersListTotalPages,
  usersListTotalResults,
} from '@redux/reqres/selectors';
import { User } from '@redux/reqres/types';
import { GenericNavigationProps } from '@routes/types';
import { isEmpty, isUndefined } from 'lodash';
import { Avatar, FlatList, Flex, Icon, Pressable, Text } from 'native-base';
import * as React from 'react';
import { useCallback, FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const UsersList: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<GenericNavigationProps>();
  const { setOptions } = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();
  const onUsersListLoading = useSelector(allUsersLoading);
  const usersList = useSelector(allUsers);
  const currentPage = useSelector(usersListCurrentPage);
  const totalPages = useSelector(usersListTotalPages);
  // const totalResults = useSelector(usersListTotalResults);

  const onGotoUserDetails = useCallback(
    (userId: number) => {
      navigation.navigate('UserDetails', {
        userId,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <Pressable onPress={() => onGotoUserDetails(item?.id)}>
        <Flex flex={1} flexDirection="row" paddingY="20px" key={item.id} alignItems="center">
          <Avatar source={{ uri: item?.avatar }} size="md" />
          <Text
            color="CLOUDS"
            fontFamily="body"
            fontStyle="normal"
            fontSize="md"
            paddingY="10px"
            paddingX="10px">{`${item.first_name} ${item.last_name}`}</Text>
        </Flex>
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
        <Flex flex={1} justifyContent="center">
          <Pressable onPress={goBack}>
            <Icon as={MaterialIcons} name="arrow-back-ios" color="MIDNIGHT_BLUE" size="24px" />
          </Pressable>
        </Flex>
      ),
      headerTitle: () => (
        <Text fontSize="20px" fontFamily="body" fontWeight={700}>
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
        backgroundColor="pageBackground"
        _contentContainerStyle={{
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
