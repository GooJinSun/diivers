import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TextareaAutosize, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createPost } from '@modules/post';
import { useStyles, SubmitButtonWrapper } from './CustomQuestionModal.styles';

const CustomQuestionModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [newCustomQuestion, setNewCustomQuestion] = useState({
    content: '',
    type: 'Question',
    shareWithFriends: true,
    shareAnonymously: true
  });

  const handleInputChange = (e) => {
    setNewCustomQuestion((prev) => ({
      ...prev,
      content: e.target.value
    }));
  };

  const onClickSubmitButton = () => {
    dispatch(createPost(newCustomQuestion));
    handleClose();
  };

  return (
    <Dialog fullWidth onClose={handleClose} maxWidth="sm" open={open}>
      <DialogTitle className={classes.modalTitle}>
        새로운 질문
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <TextareaAutosize
          id="new-custom-question"
          className={classes.textArea}
          aria-label="new custom question"
          placeholder="새로운 질문을 작성해 보세요."
          rowsMin={3}
          value={newCustomQuestion.content}
          onChange={handleInputChange}
        />
        <SubmitButtonWrapper>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            onClick={onClickSubmitButton}
          >
            게시
          </Button>
          <div className={classes.submitDetail}>
            질문은 모든 피드에 공개됩니다.
          </div>
        </SubmitButtonWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CustomQuestionModal;
