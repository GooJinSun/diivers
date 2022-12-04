/**
 * 서비스 워커 설정 파일
 * 웹앱에서 백그라운드 노티를 수신할 때 동작합니다
 */

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
// eslint-disable-next-line no-unused-vars
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  // databaseURL: 'https://project-id.firebaseio.com',
  // storageBucket: 'project-id.appspot.com',
  // measurementId: 'G-measurement-id'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
});
