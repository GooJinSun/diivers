import useArticleDraft from '@hooks/draft/useArticleDraft';
import { PostListWrapper } from '@styles/wrappers';
import React from 'react';
import { useHistory } from 'react-router';
import CreateTime from '@common-components/create-time/CreateTime';
import { useTranslation } from 'react-i18next';
import { DraftItem } from './draftList.styles';

const DraftList = () => {
  const history = useHistory();
  const [t] = useTranslation('translation', { keyPrefix: 'draft' });

  const { draftList: articleDraftList } = useArticleDraft();

  const onClickDraft = (id: number) => {
    history.push(`/draft/articles/${id}`);
  };

  return (
    <PostListWrapper>
      <h3>{t('draft_title')}</h3>
      {!!articleDraftList?.length &&
        articleDraftList.map((draft) => (
          <DraftItem
            key={draft.id}
            type="button"
            onClick={() => onClickDraft(draft.id)}
          >
            <div className="main-contents">{draft.content}</div>
            <div className="sub-contents">
              <CreateTime createdTime={draft.updated_at} />
            </div>
          </DraftItem>
        ))}
    </PostListWrapper>
  );
};

export default DraftList;
