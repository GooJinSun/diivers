import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { CommonInput, CommonButton } from '../../styles';
import { requestResetPasswordEmail } from '../../modules/user';

const LostPasswordWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

const SubButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;

export default function LostPassword() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser]);

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
    <LostPasswordWrapper>
      {isSubmitted ? (
        <div>이메일 전송이 완료되었습니다.</div>
      ) : (
        <div>
          <h1>비밀번호 초기화</h1>
          <CommonInput
            id="username-input"
            name="username"
            value={emailInfo.email}
            placeholder="이메일"
            onChange={handleChange}
            onKeyDown={onKeySubmit}
          />
          <CommonButton
            id="submit-button"
            disabled={emailInfo.email === ''}
            margin="20px 0"
            onClick={onClickSubmitButton}
          >
            이메일 전송
          </CommonButton>
          <SubButton
            type="button"
            id="login-button"
            onClick={() => history.push('/login')}
          >
            로그인
          </SubButton>
        </div>
      )}
    </LostPasswordWrapper>
  );
}
