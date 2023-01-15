import React, { useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import QuestionBox from '@common-components/question-box/QuestionBox';
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { PostItemWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import { useStyles } from './PostEditItem.styles';

const PostEditItem = ({ postObj }) => {
  const classes = useStyles();
  const [editPost, setEditPost] = useState(postObj);

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

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
            ? t('please_share_your_thoughts')
            : t('please_fill_out_the_answer')
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
