import { useEffect } from 'react';
import { PostMessageDataType, PostMessageKeyType } from './app.types';

type MessageDataType = Extract<
  PostMessageDataType,
  { key: PostMessageKeyType }
>;

const useAppMessage = ({
  cb,
  key
}: {
  cb: (data: PostMessageDataType) => void;
  key: PostMessageKeyType;
}) => {
  useEffect(() => {
    // ios
    window.addEventListener('message', ({ data }) => {
      if (data.key !== key) return;
      const messageData = JSON.parse(data) as MessageDataType;
      cb(messageData);
    });
    return () => {
      window.addEventListener('message', ({ data }) => {
        if (data.key !== key) return;
        const messageData = JSON.parse(data) as MessageDataType;
        cb(messageData);
      });
    };
  }, [cb, key]);
};

export default useAppMessage;
