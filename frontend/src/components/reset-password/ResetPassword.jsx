import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { requestResetPassword } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { CommonButton, AuthSubButton } from '@styles/buttons';
import { CommonInput } from '@styles/inputs';
import { useTranslation } from 'react-i18next';
import { ConstraintsMessage, WarningMessage } from '../../styles/messages';

export default function ResetPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, token } = useParams();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const [passwordInfo, setPasswordInfo] = useState({ password: '' });
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
  const [isResetPasswordFail, setIsResetPasswordFail] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState();

  const [t] = useTranslation('translation', { keyPrefix: 'reset_password' });

  useEffect(() => {
    if (!currentUser) return;
    history.push('/');
  }, [currentUser, history]);

  const resetPasswordStatus = useSelector(
    (state) => state.loadingReducer['user/RESET_PASSWORD']
  );

  useEffect(() => {
    setIsResetPasswordSuccess(resetPasswordStatus === 'SUCCESS');
    setIsResetPasswordFail(resetPasswordStatus === 'FAILURE');
  }, [resetPasswordStatus]);

  const { resetPasswordError } = useSelector((state) => state.userReducer);
  useEffect(() => {
    setInvalidPasswordMsg(resetPasswordError?.password);
  }, [resetPasswordError?.password]);

  const handleChange = (e) => {
    setPasswordInfo({ password: e.target.value });
    setIsResetPasswordFail(false);
    setInvalidPasswordMsg(undefined);
  };

  const onClickSubmitButton = () => {
    dispatch(requestResetPassword(id, token, passwordInfo));
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onClickSubmitButton();
    }
  };

  return (
    <AuthentiCationWrapper>
      {isResetPasswordSuccess ? (
        <div>{t('password_initialization_is_complete')}</div>
      ) : isResetPasswordFail && !invalidPasswordMsg ? (
        <div>{t('invalid_link')}</div>
      ) : (
        <div>
          <h1>{t('change_password')}</h1>
          <CommonInput
            id="password-input"
            name="password"
            value={passwordInfo.password}
            placeholder={t('password')}
            type="password"
            onChange={handleChange}
            onKeyDown={onKeySubmit}
            invalid={invalidPasswordMsg}
          />
          {invalidPasswordMsg ? (
            <WarningMessage>{invalidPasswordMsg}</WarningMessage>
          ) : (
            <ConstraintsMessage>{t('password_constraints')}</ConstraintsMessage>
          )}
          <CommonButton
            id="submit-button"
            disabled={passwordInfo.password === ''}
            margin="20px 0"
            onClick={onClickSubmitButton}
          >
            {t('change_password')}
          </CommonButton>
          <AuthSubButton
            type="button"
            id="login-button"
            onClick={() => history.push('/login')}
          >
            {t('login')}
          </AuthSubButton>
        </div>
      )}
    </AuthentiCationWrapper>
  );
}
