import React, { useState } from 'react';
import { Checkbox, Button, TextareaAutosize } from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import LockIcon from '@material-ui/icons/Lock';
import { useTranslation } from 'react-i18next';
import useAsyncEffect from '@hooks/useAsyncEffect';
import axios from '@utils/api';
import UserTagSearchList from '@components/_common/user-tag-search-list/UserTagSearchList';
import {
  NewCommentWrapper,
  PrivateWrapper,
  useStyles
} from './NewComment.styles';

export default function NewComment({
  isReply = false,
  onSubmit,
  forcePrivate = false,
  isPostAnon
}) {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });
  const userTagAllowed = !isPostAnon;
  const [content, setContent] = useState('');
  // 누군가를 태그할 가능성이 있는 단어
  const [tagQuery, setTagQuery] = useState('');
  // 태그 목록
  const [userTagList, setUserTagList] = useState([]);
  const [isPrivate, setIsPrivate] = useState(forcePrivate);
  const placeholder = isReply
    ? t('please_enter_a_reply')
    : t('please_enter_a_comment');

  const classes = useStyles();

  const handleContentChange = (e) => {
    const {
      target: { value }
    } = e;
    setContent(value);

    // 유저 태그 관련 로직
    if (!userTagAllowed) return;
    if (!value) {
      return setUserTagList([]);
    }
    if (!value.endsWith(' ') && value.includes('@')) {
      const words = value.split(' ');
      const lastWord = words[words.length - 1];
      const atIndex = lastWord.indexOf('@');
      if (atIndex >= 0) {
        const query = lastWord.slice(atIndex + 1);
        setTagQuery(query);
      }
    }
  };

  useAsyncEffect(async () => {
    if (!userTagAllowed) return;
    const { data } = await axios.get(`/user_tags/search/?query=${tagQuery}`);
    if (data) {
      setUserTagList(data.results);
    }
  }, [tagQuery, userTagAllowed]);

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
    onSubmit(content.trim(), isPrivate);
    setContent('');
    setUserTagList([]);
  };

  const handleOnSelectUserTag = (tag) => {
    setContent((prev) => {
      const lastTagQueryIndex = prev.lastIndexOf(`@${tagQuery}`);
      const filteredContent = `${prev.substring(0, lastTagQueryIndex)}@${
        tag.username
      }`;
      return filteredContent;
    });
    setUserTagList([]);
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
      {/* 유저 태그 후보 리스트  */}
      {userTagAllowed && (
        <UserTagSearchList
          userTagList={userTagList}
          onSelectUserTag={handleOnSelectUserTag}
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
