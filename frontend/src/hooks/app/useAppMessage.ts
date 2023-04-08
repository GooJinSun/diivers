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
    window.addEventListener('message', (e) => {
      const data = JSON.parse(e.data) as MessageDataType;
      if (data.key === key) {
        cb(data);
      }
    });
    return () => {
      window.addEventListener('message', (e) => {
        const data = JSON.parse(e.data) as MessageDataType;
        if (data.key === key) {
          cb(data);
        }
      });
    };
  }, [cb, key]);
};

export default useAppMessage;
