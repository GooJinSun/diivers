import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import FriendStatusButtons from '@common-components/friend-status-buttons/FriendStatusButtons';
import { useHistory } from 'react-router';
import UserProfileItem from '@common-components/user-profile-item/UserProfileItem';
import { useStyles, FriendItemWrapper, FriendLink } from './FriendItem.styles';

const FriendItem = ({
  friendObj,
  message,
  showFriendStatus = false,
  isFriend,
  hasSentRequest,
  isPending,
  onClickCallback
}) => {
  const classes = useStyles();
  const { username, profile_image, profile_pic } = friendObj;
  const history = useHistory();

  const onClickItem = () => {
    history.push(`/users/${username}`);
    onClickCallback?.();
  };

  return (
    <FriendItemWrapper onClick={onClickItem}>
      <FriendLink onClick={onClickItem}>
        <UserProfileItem
          profileImageUrl={profile_image}
          profileIconColor={profile_pic}
        />
        <ListItemText
          classes={{ primary: classes.username }}
          primary={message || username}
        />
      </FriendLink>
      {showFriendStatus && (
        <FriendStatusButtons
          friendObj={friendObj}
          isFriend={isFriend}
          isPending={isPending}
          hasSentRequest={hasSentRequest}
        />
      )}
    </FriendItemWrapper>
  );
};

export default FriendItem;
