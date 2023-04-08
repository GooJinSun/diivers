import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { StyledNotiPermissionPopup } from './NotiPermissionPopup.styles';

const NotiPermissionPopup = () => {
  const [t] = useTranslation('translation', { keyPrefix: 'common_popup' });

  const requestPermission = () => {
    console.log('TODO');
  };

  const onClose = () => {
    console.log('TODO');
  };

  return (
    <StyledNotiPermissionPopup>
      <button type="button" onClick={requestPermission}>
        {t(
          'allow_desktop_notification_to_receive_updates_from_friends_as_push_notifications'
        )}
      </button>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </StyledNotiPermissionPopup>
  );
};

export default NotiPermissionPopup;
