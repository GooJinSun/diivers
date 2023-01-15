import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { readAllNotification } from '@modules/notification';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import { useTranslation } from 'react-i18next';
import { useStyles, ButtonWrapper } from './NotificationDropdownList.styles';

const READ_ALL_NOTI_DELAY = 300;

const NotificationDropdownList = ({ notifications, setIsNotiOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [t] = useTranslation('translation', { keyPrefix: 'header' });

  const notificationList = notifications?.map((noti) => (
    <NotificationItem
      key={`noti-${noti.id}`}
      notiObj={noti}
      setIsNotiOpen={setIsNotiOpen}
    />
  ));

  useEffect(() => {
    setTimeout(() => {
      dispatch(readAllNotification());
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
        </CardContent>
      )}
    </Card>
  );
};

export default NotificationDropdownList;
