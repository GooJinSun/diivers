import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestResetPasswordEmail } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { CommonInput, CommonButton, AuthSubButton } from '../../styles';

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
    <AuthentiCationWrapper>
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
          <AuthSubButton
            type="button"
            id="login-button"
            onClick={() => history.push('/login')}
          >
            로그인
          </AuthSubButton>
        </div>
      )}
    </AuthentiCationWrapper>
  );
}
