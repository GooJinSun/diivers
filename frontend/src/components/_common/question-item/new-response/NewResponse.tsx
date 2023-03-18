import React, { ChangeEvent, useState, useEffect } from 'react';
import ShareSettings from '@components/_common/share-settings/ShareSettings';
import { TextareaAutosize } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { POST_TYPE, Question, ResponseDraft } from '@models/posts';
import useDepsFree from '@hooks/common/useDepsFree';
import useResponseDraft from '@hooks/draft/useResponseDraft';
import { useStyles } from '../QuestionItem.styles';

interface NewResponseProps {
  question: Question;
  onSubmit?: () => void;
}

const NewResponse = ({ question, onSubmit }: NewResponseProps) => {
  const classes = useStyles();
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const [newPost, setNewPost] = useState<ResponseDraft>({
    question_id: question?.id,
    question_detail: question,
    content: '',
    type: POST_TYPE.RESPONSE,
    share_with_friends: false,
    share_anonymously: false
  });

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost((prev) => ({
      ...prev,
      content: e.target.value
    }));
  };

  const onSubmitHandler = () => {
    setNewPost((prev) => ({ ...prev, content: '' }));
    onSubmit?.();
  };

  const { saveDraft } = useResponseDraft();

  const newPostRef = useDepsFree(newPost);
  useEffect(() => {
    return () => {
      if (!newPostRef.current.content.trim().length) return;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      saveDraft(newPostRef.current);
    };
  }, [newPostRef, saveDraft]);

  return (
    <>
      <TextareaAutosize
        className={classes.textArea}
        aria-label="new response"
        id="content-input"
        placeholder={t('please_fill_out_the_answer') || undefined}
        value={newPost.content}
        rowsMin={3}
        onChange={handleContentChange}
      />
      <ShareSettings postObj={newPost} resetContent={onSubmitHandler} />
    </>
  );
};

export default NewResponse;
