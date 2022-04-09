/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Cookies from 'js.cookie';
import { CommonInput, CommonButton } from '../styles';

import { requestLogin } from '../modules/user';

const LoginWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

const SignUpButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;

const WarningMessage = styled.div`
  font-size: 14px;
  color: #ff395b;
  margin-bottom: 4px;
`;

WarningMessage.displayName = 'WarningMessage';

export default function Login({ setRefreshToken }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const loginError = useSelector((state) => state.userReducer.loginError);
  const [loginWarning, setLoginWarning] = useState(false);
  const loginSuccess =
    useSelector((state) => state.loadingReducer['user/LOGIN']) === 'SUCCESS';

  useEffect(() => {
    if (loginError) {
      setLoginWarning(true);
    }
  }, [loginError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onClickSubmitButton = () => {
    dispatch(requestLogin(loginInfo));
  };

  useEffect(() => {
    if (loginSuccess) {
      setRefreshToken(Cookies.get('jwt_token_refresh'));
    }
  }, [loginSuccess]);

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(requestLogin(loginInfo));
    }
  };

  const onClickSignupButton = () => {
    history.push('/signup');
  };

  return (
    <LoginWrapper>
      <h1>로그인</h1>
      <CommonInput
        id="username-input"
        name="username"
        value={loginInfo.username}
        placeholder="닉네임"
        onChange={handleChange}
        onKeyDown={onKeySubmit}
      />
      <CommonInput
        id="password-input"
        name="password"
        value={loginInfo.password}
        placeholder="비밀번호"
        type="password"
        onChange={handleChange}
        onKeyDown={onKeySubmit}
      />
      {loginWarning && (
        <WarningMessage id="login-error-message">
          닉네임 혹은 비밀번호를 다시 확인해주세요!
        </WarningMessage>
      )}
      <CommonButton
        id="submit-button"
        disabled={loginInfo.username === '' || loginInfo.password === ''}
        margin="20px 0"
        onClick={onClickSubmitButton}
      >
        로그인
      </CommonButton>
      <SignUpButton
        type="button"
        id="signup-button"
        margin="5px 0"
        onClick={onClickSignupButton}
      >
        회원가입
      </SignUpButton>
    </LoginWrapper>
  );
}
