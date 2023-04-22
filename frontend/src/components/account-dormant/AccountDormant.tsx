import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestReactivateEmail } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import { CommonButton } from '@styles/buttons';
import { RootState } from '@modules/index';
import { Wrapper, Description } from './AccountDormant.styles';

const AccountDormant = () => {
  const dispatch = useDispatch();
  const { currentUser, requestReactivateStatus } = useSelector(
    (state: RootState) => ({
      currentUser: state.userReducer.currentUser,
      requestReactivateStatus: state.loadingReducer['user/REACTIVATE_EMAIL']
    })
  );
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [t] = useTranslation('translation', {
    keyPrefix: 'account_dormant'
  });

  // 휴면 계정 전환 이메일 전송
  const sendEmailAuthentication = () => {
    dispatch(
      requestReactivateEmail({
        id: currentUser.id
      })
    );
  };

  useEffect(() => {
    setIsEmailSent(requestReactivateStatus === 'SUCCESS');
  }, [requestReactivateStatus]);

  if (isEmailSent) {
    return (
      <AuthentiCationWrapper>
        <Wrapper>
          <Description>{t('email_has_been_sent')}</Description>
          <Description>{currentUser.email}</Description>
          <Description>{t('please_check_authentication_email')}</Description>
          <Description>{t('you_can_use_after_reactivation')}</Description>
        </Wrapper>
      </AuthentiCationWrapper>
    );
  }
  return (
    <AuthentiCationWrapper>
      <Wrapper>
        <Description>{t('your_account_is_dormant')}</Description>
        <Description>{t('you_need_to_reactivate_account')}</Description>
        <Description>{t('click_email_authenticate_button')}</Description>
        <CommonButton width={800} onClick={sendEmailAuthentication}>
          {t('email_authenticate')}
        </CommonButton>
      </Wrapper>
    </AuthentiCationWrapper>
  );
};

export default AccountDormant;
