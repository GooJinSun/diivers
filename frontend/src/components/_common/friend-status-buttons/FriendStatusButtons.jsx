import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptFriendRequest,
  deleteFriendRequest,
  requestFriend,
  rejectFriendRequest
} from '@modules/friend';
import { useTranslation } from 'react-i18next';
import { FriendButton, ButtonsWrapper } from './FriendStatusButtons.styles';

// isFriend: 이미 친구
// isPending: 해당 유저가 나한테 보낸 요청이 있음 => 이 때는 requestId 필수
// hasSentRequest: 내가 유저한테 보낸 요청이 있음 => 이 때는 requestId 필수
export default function FriendStatusButtons({
  isFriend,
  isPending,
  hasSentRequest,
  friendObj,
  isUserPage
}) {
  const dispatch = useDispatch();
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);

  const [isRequestResetted, setIsRequestResetted] = useState(false);

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [t] = useTranslation('translation', { keyPrefix: 'friend_page' });

  const onClickRejectRequestButton = () => {
    dispatch(rejectFriendRequest(friendObj.id));
    setIsRequestResetted(true);
  };

  const onClickDeleteRequestButton = () => {
    dispatch(deleteFriendRequest(friendObj.id));
    setIsRequestResetted(true);
  };

  const onClickAcceptRequestButton = () => {
    dispatch(acceptFriendRequest(friendObj.id));
    setIsRequestAccepted(true);
  };

  const onClickRequestFriendButton = () => {
    dispatch(requestFriend(friendObj.id));
    setIsRequestResetted(false);
    setIsRequestSubmitted(true);
  };

  if (friendObj.id === currentUser?.id) return null;
  if (isRequestResetted)
    return (
      <ButtonsWrapper id={friendObj.id} center={isUserPage && 'true'}>
        <FriendButton
          variant="outlined"
          color="primary"
          id="request-friend-button"
          onClick={onClickRequestFriendButton}
        >
          {t('request_a_friend')}
        </FriendButton>
      </ButtonsWrapper>
    );
  if (isFriend || isRequestAccepted)
    return (
      <ButtonsWrapper id={friendObj.id} center={isUserPage && 'true'}>
        <FriendButton
          variant="outlined"
          color="primary"
          id="friend-status-button"
        >
          {t('friend')}
          <span style={{ marginLeft: 4 }}>✓</span>
        </FriendButton>
      </ButtonsWrapper>
    );
  if (isPending)
    return (
      <ButtonsWrapper id={friendObj.id} center={isUserPage && 'true'}>
        <FriendButton
          variant="outlined"
          color="primary"
          id="request-accept-button"
          onClick={onClickAcceptRequestButton}
        >
          {t('accept')}
        </FriendButton>
        <FriendButton
          variant="outlined"
          color="secondary"
          id="request-delete-button"
          onClick={onClickRejectRequestButton}
        >
          {t('reject')}
        </FriendButton>
      </ButtonsWrapper>
    );

  if (hasSentRequest || isRequestSubmitted)
    return (
      <ButtonsWrapper id={friendObj.id} center={isUserPage && 'true'}>
        <FriendButton
          variant="outlined"
          color="primary"
          id="has-sent-request-button"
        >
          {t('requested')}
        </FriendButton>
        <FriendButton
          variant="outlined"
          color="secondary"
          id="sent-request-delete-button"
          onClick={onClickDeleteRequestButton}
        >
          {t('cancel')}
        </FriendButton>
      </ButtonsWrapper>
    );

  return (
    <ButtonsWrapper id={friendObj.id} center={isUserPage && 'true'}>
      <FriendButton
        variant="outlined"
        color="primary"
        id="request-friend-button"
        onClick={onClickRequestFriendButton}
      >
        {t('request_a_friend')}
      </FriendButton>
    </ButtonsWrapper>
  );
}
