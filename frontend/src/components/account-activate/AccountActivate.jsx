import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { requestActivate } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';

export default function AccountActivate() {
  const dispatch = useDispatch();
  const { id, token } = useParams();

  const [t] = useTranslation('translation', { keyPrefix: 'account_activate' });

  useEffect(() => {
    dispatch(requestActivate(id, token));
  }, [dispatch, id, token]);

  const [isActivatePending, setIsActivatePending] = useState(true);
  const [isActivateSuccess, setIsActivateSuccess] = useState(false);

  const activateStatus = useSelector(
    (state) => state.loadingReducer['user/ACTIVATE']
  );

  useEffect(() => {
    setIsActivatePending(activateStatus === 'REQUEST');
    setIsActivateSuccess(activateStatus === 'SUCCESS');
  }, [activateStatus]);

  return (
    <AuthentiCationWrapper>
      {isActivatePending ? (
        <div>{t('authenticating')}</div>
      ) : isActivateSuccess ? (
        <div>{t('email_authentication_is_completed')}</div>
      ) : (
        <div>{t('invalid_link')}</div>
      )}
    </AuthentiCationWrapper>
  );
}
