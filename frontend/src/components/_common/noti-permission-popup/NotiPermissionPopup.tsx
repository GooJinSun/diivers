import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useWindowWidth from '@hooks/env/useWindowWidth';
import { isMac } from '@utils/getUserAgent';
import { StyledNotiPermissionPopup } from './NotiPermissionPopup.styles';

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: any;
    };
  }
}

interface NotiPermissionPopupProps {
  requestPermission: () => void;
  onNotiPopupClose: () => void;
}

const NotiPermissionPopup = ({
  requestPermission,
  onNotiPopupClose
}: NotiPermissionPopupProps) => {
  const [t] = useTranslation('translation', { keyPrefix: 'common_popup' });

  const onClickRequestPermission = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('OPEN_SETTINGS');
      return;
    }

    requestPermission();
  };

  const { isMobile } = useWindowWidth();

  return (
    <StyledNotiPermissionPopup isMobile={isMobile}>
      <div>
        <button type="button" onClick={onClickRequestPermission}>
          {t(
            'allow_notification_to_receive_updates_from_friends_as_push_notifications'
          )}
        </button>
        {/* https://gist.github.com/rmcdongit/f66ff91e0dad78d4d6346a75ded4b751 */}
        {/* TODO: 맥 이외의 환경 확인 필요 */}
        {isMac(window?.navigator.userAgent) && (
          <a href="x-apple.systempreferences:com.apple.preference.notifications">
            {t('please_check_your_system_preferences')}
          </a>
        )}
      </div>
      <IconButton onClick={onNotiPopupClose}>
        <CloseIcon />
      </IconButton>
    </StyledNotiPermissionPopup>
  );
};

export default NotiPermissionPopup;
