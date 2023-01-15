import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestResetPasswordEmail } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { CommonButton, AuthSubButton } from '@styles/buttons';
import { CommonInput } from '@styles/inputs';
import { useTranslation } from 'react-i18next';

export default function LostPassword() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [t] = useTranslation('translation', { keyPrefix: 'lost_password' });

  useEffect(() => {
    if (!currentUser) return;
    history.push('/');
  }, [currentUser, history]);

  const [emailInfo, setEmailInfo] = useState({ email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmailInfo({ email: e.target.value });
  };

  const onClickSubmitButton = () => {
    dispatch(requestResetPasswordEmail(emailInfo));
    setIsSubmitted(true);
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClickSubmitButton();
    }
  };

  return (
    <AuthentiCationWrapper>
      {isSubmitted ? (
        <div>{t('email_has_been_sent_successfully_completed')}</div>
      ) : (
        <div>
          <h1>{t('password_initialization')}</h1>
          <CommonInput
            id="username-input"
            name="username"
            value={emailInfo.email}
            placeholder={t('email')}
            onChange={handleChange}
            onKeyDown={onKeySubmit}
          />
          <CommonButton
            id="submit-button"
            disabled={emailInfo.email === ''}
            margin="20px 0"
            onClick={onClickSubmitButton}
          >
            {t('send_an_email')}
          </CommonButton>
          <AuthSubButton
            type="button"
            id="login-button"
            onClick={() => history.push('/login')}
          >
            {t('login')}
          </AuthSubButton>
        </div>
      )}
    </AuthentiCationWrapper>
  );
}
