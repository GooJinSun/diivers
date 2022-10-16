import React, { useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import QuestionBox from '@common-components/question-box/QuestionBox';
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { PostItemWrapper } from '../../../styles';
import { useStyles } from './PostEditItem.styles';

const PostEditItem = ({ postObj }) => {
  const classes = useStyles();
  const [editPost, setEditPost] = useState(postObj);

  const onInputChange = (e) => {
    setEditPost({
      ...postObj,
      content: e.target.value
    });
  };

  return (
    <PostItemWrapper>
      {postObj?.question && <QuestionBox questionObj={postObj.question} />}
      <TextareaAutosize
        autoFocus
        id="edit-post-input"
        name="content"
        placeholder={
          postObj?.type === 'Article'
            ? '떠오르는 생각을 공유해주세요.'
            : '답변을 작성해주세요'
        }
        value={editPost?.content}
        onChange={onInputChange}
        className={classes.textarea}
      />
      <ShareSettings postObj={editPost} edit />
    </PostItemWrapper>
  );
};

export default PostEditItem;
