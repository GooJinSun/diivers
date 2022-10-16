import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { readAllNotification } from '@modules/notification';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import { useStyles, ButtonWrapper } from './NotificationDropdownList.styles';

const NotificationDropdownList = ({ notifications, setIsNotiOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const notificationList = notifications?.map((noti) => (
    <NotificationItem
      key={`noti-${noti.id}`}
      notiObj={noti}
      setIsNotiOpen={setIsNotiOpen}
    />
  ));

  const handleReadAllNotification = () => {
    dispatch(readAllNotification());
  };
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
          알림 전체 보기
        </button>
        {notifications?.length !== 0 && (
          <button
            type="button"
            className={`read-all-notifications ${classes.notiButtons}`}
            onClick={handleReadAllNotification}
          >
            모두 읽음
          </button>
        )}
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
