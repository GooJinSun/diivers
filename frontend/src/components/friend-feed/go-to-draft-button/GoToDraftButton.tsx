import React from 'react';
import { useHistory } from 'react-router';
import useArticleDraft from '@hooks/draft/useArticleDraft';
import { BorderCommonButton } from '@styles/buttons';
import { useTranslation } from 'react-i18next';
import useResponseDraft from '@hooks/draft/useResponseDraft';

const GoToDraftButton = () => {
  const [t] = useTranslation('translation', { keyPrefix: 'draft' });
  const history = useHistory();

  const onClick = () => {
    history.push('/draft');
  };

  const { draftList: articleDraftList } = useArticleDraft();
  const { draftList: responseDraftList } = useResponseDraft();

  if (!articleDraftList?.length && !responseDraftList.length) return null;

  return (
    <BorderCommonButton type="button" onClick={onClick} margin="0 0 16px 0">
      {`${t('draft_title')} ${
        articleDraftList.length + responseDraftList.length
      }`}
    </BorderCommonButton>
  );
};
export default GoToDraftButton;
