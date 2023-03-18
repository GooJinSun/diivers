import Message from '@components/_common/message/Message';
import QuestionBox from '@components/_common/question-box/QuestionBox';
import ShareSettings from '@components/_common/share-settings/ShareSettings';
import useDepsFree from '@hooks/common/useDepsFree';
import useResponseDraft from '@hooks/draft/useResponseDraft';
import { TextareaAutosize } from '@material-ui/core';
import { PostItemWrapper, PostListWrapper } from '@styles/wrappers';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { useStyles } from '@components/post-edit/post-edit-item/PostEditItem.styles';

const ResponseDraftEdit = () => {
  const [t] = useTranslation('translation');
  const classes = useStyles();

  const { id } = useParams<{ id?: string }>();
  const { draftList, updateDraft, deleteDraft } = useResponseDraft();

  const selectedDraft = draftList.find((item) => item.id.toString() === id);

  const [responseContents, setResponseContents] = useState<string>(
    selectedDraft?.content || ''
  );

  const isSubmitted = useRef(false);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setResponseContents(event.target.value);
  };

  const history = useHistory();
  const onSubmit = () => {
    if (!id) return;
    isSubmitted.current = true;
    setResponseContents('');
    deleteDraft(parseInt(id, 10));
    history.push('/home');
  };

  const responseContentsRef = useDepsFree(responseContents);

  useEffect(() => {
    return () => {
      if (isSubmitted.current) return;

      if (!id || !selectedDraft) return;

      if (!responseContentsRef.current.trim()) {
        deleteDraft(parseInt(id, 10));
        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      updateDraft(parseInt(id, 10), responseContentsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseContentsRef]);

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
        <QuestionBox questionObj={selectedDraft.question_detail} />
        <TextareaAutosize
          autoFocus
          placeholder={t('feed_common.please_share_your_thoughts') || ''}
          value={responseContents}
          onChange={onChange}
          className={classes.textarea}
        />
        <ShareSettings
          postObj={{ ...selectedDraft, content: responseContents }}
          onSubmit={onSubmit}
        />
      </PostItemWrapper>
    </PostListWrapper>
  );
};

export default ResponseDraftEdit;
