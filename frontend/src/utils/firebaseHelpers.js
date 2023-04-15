import axios from '@utils/api';
import { getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBfQY-WwCn-0v49OybMRcEY3iT4iTIA2Uc',
  authDomain: 'diivers.firebaseapp.com',
  projectId: 'diivers',
  storageBucket: 'diivers.appspot.com',
  messagingSenderId: '212831338880',
  appId: '1:212831338880:web:fb5ae035f87ed3fd7f8165',
  measurementId: 'G-Z4CFQWR4R4'
};

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') return true;
    return false;
  } catch (e) {
    return false;
  }
};

export const getFCMRegistrationToken = async (messaging) => {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  if (!messaging) return;

  try {
    const registrationToken = await getToken(messaging, {
      vapidKey:
        'BJbDPBE9aQ5MTEf1nSiviZNEE83hEWIMbiV45a_lNolcSefw5pxfckjdJafeUBXjHFs72rpjCYi9kbMAtHiKQlQ'
    });

    if (!registrationToken) return;

    activateDevice(registrationToken);
    return registrationToken;
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

const activateDevice = (token) => {
  if (!token) return;

  axios.post('/devices/', {
    type: 'web',
    registration_id: token,
    active: true
  });
};

export const deactivateFirebaseDevice = (token) => {
  if (!token) return;

  axios.post('/devices/', {
    type: 'web',
    registration_id: token,
    active: false
  });
};

export const addForegroundMessageEventListener = (messaging) => {
  onMessage(messaging, (payload) => {
    const { body, url, tag, type } = payload.data;
    const title = 'Diivers';
    const options = {
      body,
      tag,
      icon: 'https://diivers.world/assets/logo/full-logo.svg',
      data: {
        url
      }
    };

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      const registration = registrations.filter((item) =>
        item.scope.includes('firebase')
      )[0];

      if (type === 'new') {
        registration.showNotification(title, options);
        return;
      }

      registration.getNotifications().then((notifications) => {
        const prev = notifications.filter(
          (notification) => notification.tag === payload.data.tag
        );

        if (prev.length > 0) {
          registration.showNotification(title, options);
        }
      });
    });
  });
};
