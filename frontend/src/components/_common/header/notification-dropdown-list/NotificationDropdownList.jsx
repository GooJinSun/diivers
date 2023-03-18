import React, { useEffect, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  readNotifications,
  appendNotifications,
  getNotifications
} from '@modules/notification';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useTranslation } from 'react-i18next';
import { useStyles, ButtonWrapper } from './NotificationDropdownList.styles';

const READ_ALL_NOTI_DELAY = 1000;

const NotificationDropdownList = ({ setIsNotiOpen }) => {
  const [t] = useTranslation('translation', { keyPrefix: 'header' });
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notiReducer.receivedNotifications
  );

  const onIntersect = () => {
    if (notifications.length >= 90) return;
    dispatch(appendNotifications());
    setTimeout(() => {
      dispatch(readNotifications());
    }, READ_ALL_NOTI_DELAY);
  };
  const setTarget = useInfiniteScroll(onIntersect);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const notificationList = useMemo(
    () =>
      notifications?.map((noti) => (
        <NotificationItem
          key={`noti-${noti.id}`}
          notiObj={noti}
          setIsNotiOpen={setIsNotiOpen}
        />
      )),
    []
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(readNotifications());
    }, READ_ALL_NOTI_DELAY);
  }, [dispatch]);

  return (
    <Card variant="outlined" className={classes.notificationDropdown}>
      <ButtonWrapper>
        <button
          type="button"
          className={`all-notifications ${classes.notiButtons}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsNotiOpen(false);
            history.push('/notifications');
          }}
        >
          {t('view_all_notifications')}
        </button>
      </ButtonWrapper>
      {notifications?.length === 0 ? (
        <ListItem>
          <ListItemText
            classes={{ primary: classes.message }}
            primary="새로운 알림이 없습니다."
          />
        </ListItem>
      ) : (
        <CardContent className={classes.notificationDropdownContent}>
          <List>{notificationList}</List>
          <div ref={setTarget} />
        </CardContent>
      )}
    </Card>
  );
};

NotificationDropdownList.displayName = 'NotificationDropdownList';
export default React.memo(NotificationDropdownList);
