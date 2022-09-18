import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { CommonInput, CommonButton } from '../styles';
import { requestResetPassword } from '../modules/user';

const ResetPasswordWrapper = styled.div`
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

export default function ResetPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, token } = useParams();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser]);

  const [passwordInfo, setPasswordInfo] = useState({ password: '' });
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
  const [isResetPasswordFail, setIsResetPasswordFail] = useState(false);

  const resetPasswordStatus = useSelector(
    (state) => state.loadingReducer['user/RESET_PASSWORD']
  );

  useEffect(() => {
    setIsResetPasswordSuccess(resetPasswordStatus === 'SUCCESS');
    setIsResetPasswordFail(resetPasswordStatus === 'FAILURE');
  }, [resetPasswordStatus]);

  const handleChange = (e) => {
    setPasswordInfo({ password: e.target.value });
  };

  const onClickSubmitButton = () => {
    setIsResetPasswordSuccess(false);
    setIsResetPasswordFail(false);
    dispatch(requestResetPassword(id, token, passwordInfo));
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClickSubmitButton();
    }
  };

  return (
    <ResetPasswordWrapper>
      {isResetPasswordSuccess ? (
        <div>비밀번호 변경이 완료되었습니다.</div>
      ) : isResetPasswordFail ? (
        <div>유효하지 않은 링크입니다.</div>
      ) : (
        <div>
          <h1>비밀번호 변경</h1>
          <CommonInput
            id="password-input"
            name="password"
            value={passwordInfo.password}
            placeholder="비밀번호"
            type="password"
            onChange={handleChange}
            onKeyDown={onKeySubmit}
          />
          <CommonButton
            id="submit-button"
            disabled={passwordInfo.password === ''}
            margin="20px 0"
            onClick={onClickSubmitButton}
          >
            비밀번호 변경
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
    </ResetPasswordWrapper>
  );
}
