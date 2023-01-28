import React from 'react';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { FriendItemWrapper } from '@common-components/friend-item/FriendItem.styles';
import {
  createResponseRequest,
  deleteResponseRequest
} from '@modules/question';
import UserProfileItem from '@common-components/user-profile-item/UserProfileItem';
import { useStyles, SendButton } from './QuestionSendFriendItem.styles';

const QuestionSendFriendItem = ({ questionObj, friendObj, sended }) => {
  const classes = useStyles();
  const { username, profile_image, profile_pic } = friendObj;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const handleSendResponseRequest = (questionId, requesteeId) => {
    const responseRequestObj = {
      requester_id: currentUser?.id,
      requestee_id: requesteeId,
      question_id: questionId
    };
    dispatch(createResponseRequest(responseRequestObj));
  };
  const handleDeleteResponseRequest = (qid, rid) => {
    dispatch(deleteResponseRequest(qid, rid));
  };

  return (
    <FriendItemWrapper>
      <UserProfileItem
        profileImageUrl={profile_image}
        profileIconColor={profile_pic}
      />
      <ListItemText
        classes={{ primary: classes.username }}
        primary={username}
      />
      {sended ? (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => {
            handleDeleteResponseRequest(questionObj.id, friendObj.id);
          }}
        >
          보내기 취소
        </Button>
      ) : (
        <SendButton
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => {
            handleSendResponseRequest(questionObj.id, friendObj.id);
          }}
        >
          보내기
        </SendButton>
      )}
    </FriendItemWrapper>
  );
};

export default QuestionSendFriendItem;
