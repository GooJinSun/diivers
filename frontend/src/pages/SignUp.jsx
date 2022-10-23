import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { requestSignUp } from '../modules/user';
import { CommonInput, CommonButton } from '../styles';

const SignUpWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 130px;

  @media (max-width: 650px) {
    width: 90%;
  }
`;

const WarningMessage = styled.div`
  font-size: 14px;
  color: #ff395b;
  margin-bottom: 4px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -16px;
`;

const LoginButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;

const PrivacyButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;

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

          <CommonButton
            disabled={isSubmitted || !isFilled}
            margin="40px 0"
            onClick={onClickSubmitButton}
          >
            회원가입
          </CommonButton>
          <ButtonWrapper>
            <LoginButton
              type="button"
              id="login-button"
              onClick={() => history.push('/login')}
            >
              로그인
            </LoginButton>
            <PrivacyButton
              type="button"
              id="privacy-button"
              onClick={() => {
                window.location.href = './privacy.html';
              }}
            >
              개인정보처리방침
            </PrivacyButton>
          </ButtonWrapper>
        </div>
      )}
    </SignUpWrapper>
  );
}