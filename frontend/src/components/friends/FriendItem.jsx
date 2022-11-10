import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import FriendStatusButtons from './FriendStatusButtons';

export const FriendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin: 8px 0;
  padding: 6px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  cursor: pointer !important;
`;

FriendItemWrapper.displayName = 'FriendItemWrapper';
const FriendLink = styled.div`
  display: flex;
  align-items: center;
  min-width: 50%;
`;
const useStyles = makeStyles((theme) => ({
  username: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  }
}));

// eslint-disable-next-line react/prop-types
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
