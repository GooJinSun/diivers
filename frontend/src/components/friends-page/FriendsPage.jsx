import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from '@modules/friend';
import FriendItem from '@common-components/friend-item/FriendItem';
import { useTranslation } from 'react-i18next';
import { FriendListWrapper } from './FriendsPage.styles';

export default function FriendsPage() {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendReducer.friendList);

  const [t] = useTranslation('translation', { keyPrefix: 'friend_page' });
  useEffect(() => {
    dispatch(getFriendList());
  }, [dispatch]);

  const friendItemList = friendList?.map((friend) => {
    return (
      <FriendItem
        key={friend.id}
        friendObj={friend}
        isFriend
        showFriendStatus
      />
    );
  });
  return (
    <FriendListWrapper>
      <h3>
        {t('friend_list')}
        {`(${friendList?.length})`}
      </h3>
      {friendItemList}
    </FriendListWrapper>
  );
}
