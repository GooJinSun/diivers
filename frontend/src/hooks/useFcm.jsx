import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getMobileDeviceInfo } from '@utils/getUserAgent';
import { setFcmToken } from '../modules/user';
import {
  requestPermission,
  addForegroundMessageEventListener,
  firebaseConfig,
  getFCMRegistrationToken
} from '../utils/firebaseHelpers';

const useFcm = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const { isMobile } = getMobileDeviceInfo();

  const [notiPermissionStatus, setNotiPermissionStatus] = useState(
    !isMobile ? Notification.permission : null
  );

  const requestPermissionHandler = async () => {
    const permission = await requestPermission();
    setNotiPermissionStatus(permission);
  };

  const onNotiPopupClose = () => setNotiPermissionStatus();

  useEffect(() => {
    if (!currentUser || isMobile) return;

    const initializeFcm = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        if (notiPermissionStatus !== 'granted' || !app || !messaging) return;

        const token = await getFCMRegistrationToken(messaging);
        addForegroundMessageEventListener(messaging, history.push);

        dispatch(setFcmToken(token));
      } catch (e) {
        console.log(e);
      }
    };

    initializeFcm();
  }, [currentUser, dispatch, history.push, notiPermissionStatus, isMobile]);

  return { notiPermissionStatus, requestPermissionHandler, onNotiPopupClose };
};

export default useFcm;
