import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { requestActivate } from '@modules/user';

const LoginWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 120px;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export default function AccountActivate() {
  const dispatch = useDispatch();
  const { id, token } = useParams();

  useEffect(() => {
    dispatch(requestActivate(id, token));
  }, []);

  const [isActivatePending, setIsActivatePending] = useState(true);
  const [isActivateSuccess, setIsActivateSuccess] = useState(false);

  const activateStatus = useSelector(
    (state) => state.loadingReducer['user/ACTIVATE']
  );

  useEffect(() => {
    setIsActivatePending(activateStatus === 'REQUEST');
    setIsActivateSuccess(activateStatus === 'SUCCESS');
  }, [activateStatus]);

  return (
    <LoginWrapper>
      {isActivatePending ? (
        <div>인증 중 ... </div>
      ) : isActivateSuccess ? (
        <div>이메일 인증이 완료되었습니다.</div>
      ) : (
        <div>유효하지 않은 링크입니다.</div>
      )}
    </LoginWrapper>
  );
}
