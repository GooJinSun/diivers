import React, { useState } from 'react';
import { Checkbox, Button, TextareaAutosize } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import LockIcon from '@material-ui/icons/Lock';
import { useTranslation } from 'react-i18next';
import {
  NewCommentWrapper,
  PrivateWrapper,
  useStyles
} from './NewComment.styles';

export default function NewComment({
  isReply = false,
  onSubmit,
  forcePrivate = false
}) {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(forcePrivate);
  const placeholder = isReply
    ? t('please_enter_a_reply')
    : t('please_enter_a_comment');

  const classes = useStyles();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const togglePrivate = () => {
    if (forcePrivate) return;
    setIsPrivate((prev) => !prev);
  };

  const handleEnter = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!content) return;
    onSubmit(content, isPrivate);
    setContent('');
  };

  return (
    <NewCommentWrapper>
      {isReply && <SubdirectoryArrowRightIcon />}
      {isPrivate && (
        <LockIcon
          style={{
            fontSize: '16px',
            color: 'rgb(187, 187, 187)',
            marginRight: '4px'
          }}
        />
      )}
      <TextareaAutosize
        id="comment-input"
        placeholder={placeholder}
        onChange={handleContentChange}
        onKeyDown={handleEnter}
        value={content}
        className={classes.textarea}
      />
      {!isReply && (
        <PrivateWrapper>
          <Checkbox
            id="check-private"
            checked={isPrivate}
            onChange={togglePrivate}
            size="small"
            style={{
              padding: 0,
              color: 'rgba(0, 0, 0, 0.26)',
              marginRight: '4px'
            }}
          />
          {t('secret_comment')}
        </PrivateWrapper>
      )}
      <Button
        onClick={handleSubmit}
        id="submit-button"
        style={{
          padding: '2px 8px',
          minWidth: '42px',
          marginLeft: '8px',
          fontWeight: 400,
          fontSize: '13px',
          color: 'grey',
          border: '1px solid rgba(0, 0, 0, 0.26)',
          marginRight: '3px'
        }}
        color="secondary"
      >
        {t('post')}
      </Button>
    </NewCommentWrapper>
  );
}
