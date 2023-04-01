import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TextareaAutosize, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createPost } from '@modules/post';
import { useTranslation } from 'react-i18next';
import { useInfiniteFriendPostList } from '@queries/posts';
import { useStyles, SubmitButtonWrapper } from './CustomQuestionModal.styles';

const CustomQuestionModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [t] = useTranslation('translation', {
    keyPrefix: 'custom_question_modal'
  });

  const { refetch: refetchFriendPostList } = useInfiniteFriendPostList();

  const [newCustomQuestion, setNewCustomQuestion] = useState({
    content: '',
    type: 'Question',
    share_share_with_friends: true,
    share_anonymously: true
  });

  const handleInputChange = (e) => {
    setNewCustomQuestion((prev) => ({
      ...prev,
      content: e.target.value
    }));
  };

  const onClickSubmitButton = () => {
    dispatch(createPost(newCustomQuestion));
    refetchFriendPostList({ refetchPage: () => true });
    handleClose();
  };

  return (
    <Dialog fullWidth onClose={handleClose} maxWidth="sm" open={open}>
      <DialogTitle className={classes.modalTitle}>
        {t('new_question')}
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
          placeholder={t('create_a_new_question')}
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
            {t('post')}
          </Button>
          <div className={classes.submitDetail}>
            {t('questions_are_posted_in_all_feeds')}
          </div>
        </SubmitButtonWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CustomQuestionModal;
