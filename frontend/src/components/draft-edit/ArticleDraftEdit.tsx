import useArticleDraft from '@hooks/draft/useArticleDraft';
import { PostListWrapper, PostItemWrapper } from '@styles/wrappers';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Message from '@common-components/message/Message';
import { useTranslation } from 'react-i18next';
import { TextareaAutosize } from '@material-ui/core';
import { useStyles } from '@components/post-edit/post-edit-item/PostEditItem.styles';
import ShareSettings from '@components/_common/share-settings/ShareSettings';
import useDepsFree from '@hooks/common/useDepsFree';

const ArticleDraftEdit = () => {
  const [t] = useTranslation('translation');
  const classes = useStyles();

  const { id } = useParams<{ id?: string }>();
  const { draftList, updateDraft, deleteDraft } = useArticleDraft();

  const selectedDraft = draftList.find((item) => item.id.toString() === id);

  const [articleContents, setArticleContents] = useState<string>(
    selectedDraft?.content || ''
  );

  const isSubmitted = useRef(false);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArticleContents(event.target.value);
  };

  const history = useHistory();
  const onSubmit = () => {
    if (!id) return;
    isSubmitted.current = true;
    setArticleContents('');
    deleteDraft(parseInt(id, 10));
    history.push('/home');
  };

  const articleContentsRef = useDepsFree(articleContents);

  useEffect(() => {
    return () => {
      if (isSubmitted.current) return;

      if (!id || !selectedDraft) return;

      if (!articleContentsRef.current.trim()) {
        deleteDraft(parseInt(id, 10));
        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      updateDraft(parseInt(id, 10), articleContentsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleContentsRef]);

  if (!selectedDraft) {
    return (
      <PostListWrapper>
        <Message message={t('message.this_draft_does_not_exist')} />
      </PostListWrapper>
    );
  }
  return (
    <PostListWrapper>
      <PostItemWrapper>
        <TextareaAutosize
          autoFocus
          placeholder={t('feed_common.please_share_your_thoughts') || ''}
          value={articleContents}
          onChange={onChange}
          className={classes.textarea}
        />
        <ShareSettings
          postObj={{ ...selectedDraft, content: articleContents }}
          isArticle
          onSubmit={onSubmit}
        />
      </PostItemWrapper>
    </PostListWrapper>
  );
};

export default ArticleDraftEdit;
