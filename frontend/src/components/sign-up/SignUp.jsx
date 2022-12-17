import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestSignUp } from '@modules/user';
import { CommonButton, AuthSubButton } from '@styles/buttons';
import { CommonInput } from '@styles/inputs';
import { WarningMessage } from '@styles/messages';
import { SignUpWrapper, ButtonWrapper } from './SignUp.styles';

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser]);

  const { signUpError } = useSelector((state) => state.userReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const signUpSuccess =
    useSelector((state) => state.loadingReducer['user/SIGN_UP']) === 'SUCCESS';

  useEffect(() => {
    setIsSignUpSuccess(signUpSuccess);
    if (signUpError && signUpError.username) setIsUsernameValid(false);
    if (signUpError && signUpError.email) setIsEmailValid(false);
  }, [signUpSuccess, signUpError]);

  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
    profileImage: ''
  });

  const isFilled =
    signUpInfo.username.length &&
    signUpInfo.password.length &&
    signUpInfo.email.length;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    setSignUpInfo((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const createFormData = () => {
    const formData = new FormData();
    const { email, username, password, profileImage } = signUpInfo;
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);

    return formData;
  };

  const onClickSubmitButton = () => {
    setIsSignUpSuccess(false);
    setIsSubmitted(true);
    setIsUsernameValid(true);
    setIsEmailValid(true);
    dispatch(requestSignUp(createFormData()));
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
        <div>이메일 인증 완료해주세요.</div>
      ) : (
        <div>
          <h1 id="signup-title">회원가입</h1>
          <CommonInput
            name="username"
            id="username-input"
            value={signUpInfo.username}
            placeholder="닉네임"
            onChange={onInputChange}
            invalid={isSubmitted && !isUsernameValid}
          />
          {isSubmitted && !isUsernameValid && (
            <WarningMessage>닉네임이 유효하지 않습니다 :(</WarningMessage>
          )}
          <CommonInput
            id="email-input"
            name="email"
            value={signUpInfo.email}
            placeholder="이메일"
            onChange={onInputChange}
            invalid={isSubmitted && !isEmailValid}
          />
          {isSubmitted && !isEmailValid && (
            <WarningMessage>이메일이 유효하지 않습니다 :(</WarningMessage>
          )}
          <CommonInput
            name="password"
            type="password"
            id="password-input"
            value={signUpInfo.password}
            placeholder="비밀번호"
            onChange={onInputChange}
            onKeyDown={onKeySubmit}
          />
          <CommonInput
            name="profile-image"
            type="file"
            accept="image/jpeg, image/png"
            onChange={onImageChange}
          />

          <CommonButton
            disabled={isSubmitted || !isFilled}
            margin="40px 0"
            onClick={onClickSubmitButton}
          >
            회원가입
          </CommonButton>
          <ButtonWrapper>
            <AuthSubButton
              type="button"
              id="login-button"
              onClick={() => history.push('/login')}
            >
              로그인
            </AuthSubButton>
            <AuthSubButton
              type="button"
              id="privacy-button"
              onClick={handleOnClickPrivacy}
            >
              개인정보처리방침
            </AuthSubButton>
          </ButtonWrapper>
        </div>
      )}
    </SignUpWrapper>
  );
}
