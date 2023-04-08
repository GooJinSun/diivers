import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const initializeFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        const permission = await requestPermission();

        if (!permission || !app || !messaging) return;

        if (permission !== 'granted') {
          setShowPermissionPopup(true);
          return;
        }
        const token = await getFCMRegistrationToken(messaging);
        addForegroundMessageEventListener(messaging, history.push);

        dispatch(setFcmToken(token));
      } catch (e) {
        console.log(e);
      }
    };

    initializeFirebase();
  }, [currentUser, dispatch, history.push]);

  return showPermissionPopup;
};

export default useFcm;
