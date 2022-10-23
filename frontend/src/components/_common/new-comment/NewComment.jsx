import React, { useState } from 'react';
import { Checkbox, Button, TextareaAutosize } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import LockIcon from '@material-ui/icons/Lock';
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
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(forcePrivate);
  const placeholder = isReply ? '답글을 입력하세요.' : '댓글을 입력하세요.';
  const classes = useStyles();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const togglePrivate = () => {
    if (forcePrivate) return;
    setIsPrivate((prev) => !prev);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
      e.preventDefault();
      e.stopPropagation();
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
        비밀 댓글
      </PrivateWrapper>
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
        작성
      </Button>
    </NewCommentWrapper>
  );
}
