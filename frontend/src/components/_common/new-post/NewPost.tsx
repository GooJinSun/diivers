import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { useTranslation } from 'react-i18next';
import useArticleDraft from '@hooks/draft/useArticleDraft';
import { ArticleDraft, POST_TYPE } from '@models/posts';
import useDepsFree from '@hooks/common/useDepsFree';
import { useStyles, NewPostWrapper } from './NewPost.styles';

export default function NewPost() {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });
  const classes = useStyles();

  const [postInfo, setPostInfo] = useState<ArticleDraft>({
    content: '',
    type: POST_TYPE.ARTICLE,
    share_with_friends: true,
    share_anonymously: false
  });

  const onInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPostInfo((prev) => ({ ...prev, [name]: value }));
  };

  const resetContent = () => {
    setPostInfo((prev) => ({ ...prev, content: '' }));
  };

  const { saveDraft } = useArticleDraft();
  const postInfoRef = useDepsFree(postInfo);

  useEffect(() => {
    return () => {
      if (!postInfoRef.current.content.trim().length) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      saveDraft(postInfoRef.current);
    };
  }, [postInfoRef, saveDraft]);

  return (
    <NewPostWrapper>
      <TextareaAutosize
        id="new-post-input"
        name="content"
        placeholder={t('please_share_your_thoughts') || undefined}
        style={{ minHeight: '70px' }}
        value={postInfo.content}
        onChange={onInputChange}
        className={classes.textarea}
      />
      <ShareSettings postObj={postInfo} resetContent={resetContent} isArticle />
    </NewPostWrapper>
  );
}
