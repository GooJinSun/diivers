import { getToken, onMessage } from 'firebase/messaging';
import axios from '@utils/api';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    return permission;
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
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
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

export const addForegroundMessageEventListener = (messaging, onClick) => {
  onMessage(messaging, (payload) => {
    // TODO: 노티 아이콘 설정
    const {
      notification: { title, body },
      data: { url }
    } = payload;

    const noti = new Notification(title, { body });

    noti.onclick = () => {
      if (url) onClick(url);
      noti.close();
    };
  });
};
