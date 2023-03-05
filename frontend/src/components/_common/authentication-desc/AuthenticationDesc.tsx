import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticationDescWrapper } from './AuthenticationDesc.styles';

const AuthenticationDesc = () => {
  const [t] = useTranslation('translation', { keyPrefix: 'auth_desc' });

  return <AuthenticationDescWrapper>{t('welcome')}</AuthenticationDescWrapper>;
};

export default AuthenticationDesc;
