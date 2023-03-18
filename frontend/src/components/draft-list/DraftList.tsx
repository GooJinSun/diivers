import useArticleDraft from '@hooks/draft/useArticleDraft';
import { PostListWrapper } from '@styles/wrappers';
import React from 'react';
import { useHistory } from 'react-router';
import CreateTime from '@common-components/create-time/CreateTime';
import { useTranslation } from 'react-i18next';
import useResponseDraft from '@hooks/draft/useResponseDraft';
import { QuestionBoxWrapper } from '@components/_common/question-box/QuestionBox.styles';
import { ArticleDraftItem, ResponseDraftItem } from './draftList.styles';

const DraftList = () => {
  const history = useHistory();
  const [t] = useTranslation('translation', { keyPrefix: 'draft' });

  const { draftList: articleDraftList } = useArticleDraft();
  const { draftList: responseDraftList } = useResponseDraft();

  const onClickDraft = (id: number) => {
    history.push(`/draft/articles/${id}`);
  };

  return (
    <PostListWrapper>
      <h3>{t('draft_title')}</h3>

      {!!articleDraftList?.length && (
        <>
          <h2>{t('draft_TMI_title')}</h2>
          {articleDraftList.map((draft) => (
            <ArticleDraftItem
              key={draft.id}
              type="button"
              onClick={() => onClickDraft(draft.id)}
            >
              <div className="main-contents">{draft.content}</div>
              <div className="sub-contents">
                <CreateTime createdTime={draft.updated_at} />
              </div>
            </ArticleDraftItem>
          ))}
        </>
      )}
      {!!responseDraftList?.length && (
        <>
          <h2>{t('draft_Q&A_title')}</h2>
          {responseDraftList.map((draft) => (
            <ResponseDraftItem key={draft.id}>
              <QuestionBoxWrapper>
                {draft.question_detail.content}
              </QuestionBoxWrapper>
              <div className="main-contents">{draft.content}</div>
              <CreateTime createdTime={draft.updated_at} />
            </ResponseDraftItem>
          ))}
        </>
      )}
    </PostListWrapper>
  );
};

export default DraftList;
