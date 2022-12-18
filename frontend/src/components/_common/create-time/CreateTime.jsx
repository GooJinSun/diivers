import React, { useState, useEffect } from 'react';
import { getCreatedTime } from '@utils/dateTimeHelpers';
import { TimeWrapper } from './CreateTime.styles';

export default function CreateTime({ createdTime }) {
  const [displayTime, setDisplayTime] = useState(getCreatedTime(createdTime));

  useEffect(() => {
    const interval = setInterval(
      () => setDisplayTime(getCreatedTime(createdTime)),
      1000 * 30
    );
    return () => {
      clearInterval(interval);
    };
  }, [createdTime]);
  return <TimeWrapper>{displayTime}</TimeWrapper>;
}
