import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import { useHistory } from 'react-router';
import FriendStatusButtons from '@common-components/friend-status-buttons/FriendStatusButtons';
import { useStyles, FriendItemWrapper, FriendLink } from './FriendItem.styles';

const FriendItem = ({
  friendObj,
  message,
  showFriendStatus = false,
  isFriend,
  hasSentRequest,
  isPending
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { username } = friendObj;

  const onClick = () => {
    history.push(`/users/${username}`);
  };

  return (
    <FriendItemWrapper onClick={onClick}>
      <FriendLink onClick={onClick}>
        <FaceIcon />
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
