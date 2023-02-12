import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { requestActivate } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import { CommonButton } from '@styles/buttons';
import { AccountActivateWrapper, ActivateDesc } from './AccountActivate.styles';

export default function AccountActivate() {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const history = useHistory();

  const [t] = useTranslation('translation', { keyPrefix: 'account_activate' });

  useEffect(() => {
    dispatch(requestActivate(id, token));
  }, [dispatch, id, token]);

  const [isActivatePending, setIsActivatePending] = useState(true);
  const [isActivateSuccess, setIsActivateSuccess] = useState(false);

  const activateStatus = useSelector(
    (state) => state.loadingReducer['user/ACTIVATE']
  );

  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');

  useEffect(() => {
    setIsActivatePending(activateStatus === 'REQUEST');
    setIsActivateSuccess(activateStatus === 'SUCCESS');
  }, [activateStatus]);

  return (
    <AuthentiCationWrapper>
      <AccountActivateWrapper>
        {isActivatePending ? (
          <ActivateDesc>{t('authenticating')}</ActivateDesc>
        ) : isActivateSuccess ? (
          <>
            <ActivateDesc>
              {t('email_authentication_is_completed')}
            </ActivateDesc>
            <CommonButton width={800} onClick={onClickLogin}>
              {t('login_and_tour_diivers')}
            </CommonButton>
          </>
        ) : (
          <>
            <ActivateDesc>{t('invalid_link')}</ActivateDesc>
            <CommonButton width={800} onClick={onClickLogin}>
              {t('login')}
            </CommonButton>
            <CommonButton width={800} onClick={onClickSignUp} sub>
              {t('signup')}
            </CommonButton>
          </>
        )}
      </AccountActivateWrapper>
    </AuthentiCationWrapper>
  );
}
