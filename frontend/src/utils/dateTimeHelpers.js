import { format } from 'date-fns';
import i18n from '@i18n';

export const formatDate = (
  date,
  dateFormat = 'yyyy.MM.dd. HH:mm',
  options = {}
) => {
  try {
    const newDate = new Date(date);
    return format(newDate, dateFormat, options);
  } catch (error) {
    return date;
  }
};

export const getCreatedTime = (createdTime) => {
  if (!createdTime) {
    return '';
  }
  const now = new Date();
  const writeTime = new Date(createdTime);

  const betweenSeconds = Math.floor(
    (now.getTime() - writeTime.getTime()) / 1000
  );
  const betweenTime = Math.floor(
    (now.getTime() - writeTime.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) {
    return betweenSeconds < 1
      ? i18n.t('feed_common.just_a_moment_ago')
      : betweenSeconds > 1
      ? i18n.t('feed_common.second_ago_other', { second: betweenSeconds })
      : i18n.t('feed_common.second_ago_one', { second: betweenSeconds });
  }
  if (betweenTime < 60) {
    return betweenTime > 1
      ? i18n.t('feed_common.minute_ago_other', { minute: betweenTime })
      : i18n.t('feed_common.minute_ago_one', { minute: betweenTime });
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return betweenTimeHour > 1
      ? i18n.t('feed_common.hour_ago_other', { hour: betweenTimeHour })
      : i18n.t('feed_common.hour_ago_one', { hour: betweenTimeHour });
  }

  return formatDate(createdTime);

  // const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  // if (betweenTimeDay < 31) {
  //   return `${betweenTimeDay}일 전`;
  // }
  // if (betweenTimeDay < 365) {
  //   return formatDate(writeTime, 'yyyy-MM-dd');
  // }

  // return `${Math.floor(betweenTimeDay / 365)}년 전`;
};
