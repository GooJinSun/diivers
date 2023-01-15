import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { CommonButton, AuthSubButton } from '@styles/buttons';
import { CommonInput } from '@styles/inputs';
import { WarningMessage } from '@styles/messages';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const loginError = useSelector((state) => state.userReducer.loginError);
  const [loginWarning, setLoginWarning] = useState(false);

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [t] = useTranslation('translation', { keyPrefix: 'login' });

  useEffect(() => {
    if (loginError) {
      setLoginWarning(true);
    }
  }, [loginError]);

  useEffect(() => {
    if (!currentUser) return;
    if (!currentUser.question_history) history.push('/select-questions');
    else history.push('/');
  }, [currentUser, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onClickSubmitButton = () => {
    dispatch(requestLogin(loginInfo));
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(requestLogin(loginInfo));
    }
  };

  const onClickSignupButton = () => {
    history.push('/signup');
  };

  const onClickLostPassword = () => {
    history.push('/lost-password');
  };

  return (
    <AuthentiCationWrapper>
      <h1>{t('login')}</h1>
      <CommonInput
        id="username-input"
        name="username"
        value={loginInfo.username}
        placeholder={t('nickname')}
        onChange={handleChange}
        onKeyDown={onKeySubmit}
      />
      <CommonInput
        id="password-input"
        name="password"
        value={loginInfo.password}
        placeholder={t('password')}
        type="password"
        onChange={handleChange}
        onKeyDown={onKeySubmit}
      />
      {loginWarning && (
        <WarningMessage id="login-error-message">
          {t('invalid_authentication')}
        </WarningMessage>
      )}
      <CommonButton
        id="submit-button"
        disabled={loginInfo.username === '' || loginInfo.password === ''}
        margin="20px 0"
        onClick={onClickSubmitButton}
      >
        {t('login')}
      </CommonButton>
      <AuthSubButton
        type="button"
        id="signup-button"
        margin="5px 0"
        onClick={onClickLostPassword}
      >
        {t('forgot_password')}
      </AuthSubButton>
      <AuthSubButton
        type="button"
        id="signup-button"
        margin="40px 0"
        onClick={onClickSignupButton}
      >
        {t('sign_up')}
      </AuthSubButton>
    </AuthentiCationWrapper>
  );
}
