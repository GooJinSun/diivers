import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { getResponseRequestsByQuestion } from '@modules/question';
import QuestionSendFriendItem from '../question-send-friend-item/QuestionSendFriendItem';
import { useStyles, Question, NoFriend } from './QuestionSendModal.styles';

const QuestionSendModal = ({ questionObj, open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendReducer.friendList);
  const selectedQuestionResponseRequests = useSelector(
    (state) => state.questionReducer.selectedQuestionResponseRequests
  );

  useEffect(() => {
    dispatch(getResponseRequestsByQuestion(questionObj.id));
  }, [dispatch, questionObj]);

  const friendItemList = friendList?.map((friend) => {
    return (
      <QuestionSendFriendItem
        key={friend.id}
        questionObj={questionObj}
        friendObj={friend}
        sended={selectedQuestionResponseRequests?.find(
          (r) => r.requestee_id === friend.id
        )}
      />
    );
  });

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      maxWidth="sm"
      open={open}
      className="question-send"
    >
      <DialogTitle className={classes.modalTitle} onClose={handleClose}>
        질문 보내기
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Question>{questionObj.content}</Question>
        <List className={classes.list} aria-label="friend list">
          {friendList.length ? (
            friendItemList
          ) : (
            <NoFriend>친구를 추가해야 사용 가능한 기능입니다.</NoFriend>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionSendModal;
