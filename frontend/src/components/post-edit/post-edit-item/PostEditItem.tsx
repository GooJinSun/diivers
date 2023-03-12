import React, { useState, ChangeEvent } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import QuestionBox from '@common-components/question-box/QuestionBox';
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { PostItemWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import { Post } from '@models/posts';
import { isArticle, isResponse } from '@models/postTypeGuards';
import { useStyles } from './PostEditItem.styles';

interface PostEditItemProps {
  postObj: Post;
}

const PostEditItem = ({ postObj }: PostEditItemProps) => {
  const classes = useStyles();
  const [editPost, setEditPost] = useState<Post>(postObj);

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditPost({
      ...postObj,
      content: event.target.value
    });
  };

  const placeholder = () =>
    isArticle(postObj)
      ? t('please_share_your_thoughts')
      : t('please_fill_out_the_answer');

  return (
    <PostItemWrapper>
      {isResponse(postObj) && <QuestionBox questionObj={postObj.question} />}
      <TextareaAutosize
        autoFocus
        id="edit-post-input"
        name="content"
        placeholder={placeholder()}
        value={editPost?.content}
        onChange={onInputChange}
        className={classes.textarea}
      />
      <ShareSettings postObj={editPost} isEdit isArticle={isArticle(postObj)} />
    </PostItemWrapper>
  );
};

export default PostEditItem;
