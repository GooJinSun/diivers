import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from '../apis';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  requestPermission();
  getFCMRegistrationToken(messaging);
  addForegroundMessageEventListener(messaging);
};

const requestPermission = () => {
  console.log('Request permission...');

  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      getFCMRegistrationToken();
    }
  });
};

const getFCMRegistrationToken = (messaging) => {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  if (!messaging) {
    return;
  }

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
  })
    .then((registrationToken) => {
      if (registrationToken) {
        console.log(
          `%c테스트를 위해 다음의 등록키를 backend/adoorback/feed/views.py의 registration_token에 등록해보세요!: ${registrationToken}`,
          'color: yellow'
        );
        // Send the token to your server and update the UI if necessary
        axios.post('/devices/', {
          type: 'web',
          registration_id: registrationToken
        });
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

const addForegroundMessageEventListener = (messaging) => {
  onMessage(messaging, (payload) => {
    console.log('Received foreground message', payload);

    // TODO: 노티의 내용 구성, 제목, 링크, 아이콘 등의 설정 필요
    const {
      notification: { title, body },
      data: { url }
    } = payload;

    const noti = new Notification(title, { body });
    noti.onclick = () => {
      // TODO: 노티를 클릭했을 때 동작 정의 필요 e.g. URL 이동 등
      console.log(url);
    };
  });
};

export default requestPermission;
