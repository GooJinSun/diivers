import React from 'react';
import { useHistory } from 'react-router';
import useArticleDraft from '@hooks/useArticleDraft';
import { BorderCommonButton } from '@styles/buttons';
import { useTranslation } from 'react-i18next';

const GoToDraftButton = () => {
  const [t] = useTranslation('translation', { keyPrefix: 'draft' });
  const history = useHistory();

  const onClick = () => {
    history.push('/draft');
  };

  const { draftList } = useArticleDraft();
  return (
    <BorderCommonButton type="button" onClick={onClick} margin="0 0 16px 0">
      {`${t('draft_title')} ${draftList.length}`}
    </BorderCommonButton>
  );
};
export default GoToDraftButton;
