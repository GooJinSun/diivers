import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from '@modules/friend';
import FriendItem from '@common-components/friend-item/FriendItem';
import { FriendListWrapper, FriendListContainer } from './FriendsPage.styles';

export default function FriendsPage() {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendReducer.friendList);

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
      <FriendListContainer>
        <h3>
          친구 목록
          {`(${friendList?.length})`}
        </h3>
        {friendItemList}
      </FriendListContainer>
    </FriendListWrapper>
  );
}
