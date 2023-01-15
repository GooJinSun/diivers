import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestSignUp } from '@modules/user';
import { CommonButton, AuthSubButton } from '@styles/buttons';
import { CommonInput } from '@styles/inputs';
import { WarningMessage } from '@styles/messages';
import { useTranslation } from 'react-i18next';
import { SignUpWrapper, ButtonWrapper } from './SignUp.styles';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const signUpSuccess =
    useSelector((state) => state.loadingReducer['user/SIGN_UP']) === 'SUCCESS';

  const [t] = useTranslation('translation', { keyPrefix: 'sign_up' });

  useEffect(() => {
    if (!currentUser) return;
    history.push('/');
  }, [currentUser, history]);

  const { signUpError } = useSelector((state) => state.userReducer);

  useEffect(() => {
    setIsSignUpSuccess(signUpSuccess);
    if (signUpError && signUpError.username) setIsUsernameValid(false);
    if (signUpError && signUpError.email) setIsEmailValid(false);
  }, [signUpSuccess, signUpError]);

  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: ''
  });

  const isFilled =
    signUpInfo.username.length &&
    signUpInfo.password.length &&
    signUpInfo.email.length;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onClickSubmitButton = () => {
    setIsSignUpSuccess(false);
    setIsSubmitted(true);
    setIsUsernameValid(true);
    setIsEmailValid(true);
    dispatch(requestSignUp(signUpInfo));
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClickSubmitButton();
    }
  };

  const handleOnClickPrivacy = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          actionType: 'OPEN_BROWSER',
          url: `${window.origin}/privacy.html`
        })
      );
    } else window.location.href = './privacy.html';
  };

  return (
    <SignUpWrapper>
      {isSubmitted && isSignUpSuccess ? (
        <div>{t('please_complete_the_email_verification')}</div>
      ) : (
        <div>
          <h1 id="signup-title">{t('sign_up')}</h1>
          <CommonInput
            name="username"
            id="username-input"
            value={signUpInfo.username}
            placeholder={t('nickname')}
            onChange={onInputChange}
            invalid={isSubmitted && !isUsernameValid}
          />
          {isSubmitted && !isUsernameValid && (
            <WarningMessage>{t('nickname_is_not_valid')}</WarningMessage>
          )}
          <CommonInput
            id="email-input"
            name="email"
            value={signUpInfo.email}
            placeholder={t('email')}
            onChange={onInputChange}
            invalid={isSubmitted && !isEmailValid}
          />
          {isSubmitted && !isEmailValid && (
            <WarningMessage>{t('email_is_not_valid')}</WarningMessage>
          )}
          <CommonInput
            name="password"
            type="password"
            id="password-input"
            value={signUpInfo.password}
            placeholder={t('password')}
            onChange={onInputChange}
            onKeyDown={onKeySubmit}
          />

          <CommonButton
            disabled={isSubmitted || !isFilled}
            margin="40px 0"
            onClick={onClickSubmitButton}
          >
            {t('sign_up')}
          </CommonButton>
          <ButtonWrapper>
            <AuthSubButton
              type="button"
              id="login-button"
              onClick={() => history.push('/login')}
            >
              {t('login')}
            </AuthSubButton>
            <AuthSubButton
              type="button"
              id="privacy-button"
              onClick={handleOnClickPrivacy}
            >
              {t('personal_information_processing_policy')}
            </AuthSubButton>
          </ButtonWrapper>
        </div>
      )}
    </SignUpWrapper>
  );
}
