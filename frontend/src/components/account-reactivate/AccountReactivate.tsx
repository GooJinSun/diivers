import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { requestReactivate } from '@modules/user';
import { AuthentiCationWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import { CommonButton } from '@styles/buttons';
import { RootState } from '@modules/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Wrapper, Description } from './AccountReactivate.styles';

type AccountReactivateParams = {
  id: string;
  token: string;
};

const AccountReactivate = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams<AccountReactivateParams>();
  const history = useHistory();

  const reactivateStatus = useSelector(
    (state: RootState) => state.loadingReducer['user/REACTIVATE']
  );

  const [t] = useTranslation('translation', {
    keyPrefix: 'account_reactivate'
  });

  const isLoading = reactivateStatus === 'REQUEST';
  const isSucceed = reactivateStatus === 'SUCCESS';

  const onClickLogin = () => history.push('/login');
  const onClickSignUp = () => history.push('/signup');

  // 들어오자마자 휴면계정 해제 시도
  useEffect(() => {
    dispatch(requestReactivate(id, token));
  }, [dispatch, id, token]);

  //  로딩중
  if (isLoading) {
    return (
      <AuthentiCationWrapper>
        <Wrapper>
          <CircularProgress color="secondary" />
          <Description>{t('authenticating')}</Description>
        </Wrapper>
      </AuthentiCationWrapper>
    );
  }

  return (
    <AuthentiCationWrapper>
      <Wrapper>
        {isSucceed ? (
          // 성공
          <>
            <Description>{t('account_reactivation_is_completed')}</Description>
            <CommonButton width={800} onClick={onClickLogin}>
              {t('please_login')}
            </CommonButton>
          </>
        ) : (
          // 실패
          <>
            <Description>{t('invalid_link')}</Description>
            <CommonButton width={800} onClick={onClickLogin}>
              {t('go_to_login')}
            </CommonButton>
            <CommonButton width={800} onClick={onClickSignUp}>
              {t('sign_up')}
            </CommonButton>
          </>
        )}
      </Wrapper>
    </AuthentiCationWrapper>
  );
};

export default AccountReactivate;
