/**
 * 서비스 워커 설정 파일
 * 웹앱에서 백그라운드 노티를 수신할 때 동작합니다
 */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
// 참고: 왜 importScripts를 사용하나요? - https://web.dev/es-modules-in-sw/
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBfQY-WwCn-0v49OybMRcEY3iT4iTIA2Uc',
  authDomain: 'diivers.firebaseapp.com',
  projectId: 'diivers',
  storageBucket: 'diivers.appspot.com',
  messagingSenderId: '212831338880',
  appId: '1:212831338880:web:fb5ae035f87ed3fd7f8165',
  measurementId: 'G-Z4CFQWR4R4'
});

// NOTE: Most importantly, in your service worker add a 'notificationclick' event listener before calling firebase.messaging()
self.addEventListener('notificationclick', (e) => {
  e.stopImmediatePropagation();
  e.waitUntil(clients.openWindow(`${self.origin}${e.notification.data.url}`));
  e.notification.close();
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { message_en, message_ko, url, tag, type } = payload.data;
  const title = 'Diivers';

  const options = {
    body: self.navigator.language === 'ko' ? message_ko : message_en,
    tag,
    icon: 'https://diivers.world/assets/logo/full-logo.svg',
    data: {
      url
    }
  };

  if (type === 'new') {
    self.registration.showNotification(title, options);
    return;
  }

  self.registration.getNotifications().then((notifications) => {
    const prev = notifications.filter(
      (notification) => notification.tag === payload.data.tag
    );

    if (prev.length > 0) {
      self.registration.showNotification(title, options);
    }
  });
});
