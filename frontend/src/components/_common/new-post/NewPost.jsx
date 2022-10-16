import React, { useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { useStyles, NewPostWrapper } from './NewPost.styles';

export default function NewPost() {
  const classes = useStyles();
  const [postInfo, setPostInfo] = useState({
    content: '',
    type: 'Article'
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostInfo((prev) => ({ ...prev, [name]: value }));
  };

  const resetContent = () => {
    setPostInfo((prev) => ({ ...prev, content: '' }));
  };

  return (
    <NewPostWrapper>
      <TextareaAutosize
        id="new-post-input"
        name="content"
        placeholder="떠오르는 생각을 공유해주세요."
        style={{ minHeight: '70px' }}
        value={postInfo.content}
        onChange={onInputChange}
        className={classes.textarea}
      />
      <ShareSettings newPost={postInfo} resetContent={resetContent} isArticle />
    </NewPostWrapper>
  );
}
