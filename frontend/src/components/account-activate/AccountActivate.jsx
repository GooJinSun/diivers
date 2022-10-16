import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { requestActivate } from '@modules/user';
import { AuthentiCationWrapper } from '../../styles';

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
    <AuthentiCationWrapper>
      {isActivatePending ? (
        <div>인증 중 ... </div>
      ) : isActivateSuccess ? (
        <div>이메일 인증이 완료되었습니다.</div>
      ) : (
        <div>유효하지 않은 링크입니다.</div>
      )}
    </AuthentiCationWrapper>
  );
}
