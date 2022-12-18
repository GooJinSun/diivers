import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import FaceIcon from '@material-ui/icons/Face';
import { getCreatedTime } from '@utils/dateTimeHelpers';
import {
  useStyles,
  MessageWrapper,
  AnonIcon,
  NotiCreatedAt
} from './NotificationItem.styles';

const NotificationItem = ({ notiObj, isNotificationPage }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClickNotiItem = () => {
    history.push(notiObj.redirect_url);
  };

  const { actor_detail } = notiObj;

  return (
    <ListItem
      className={`${isNotificationPage && classes.notificationPageWrapper} ${
        !notiObj.is_read && classes.unread
      } ${classes.notiLink} ${classes.listItemWrapper}`}
      onClick={handleClickNotiItem}
      style={{ transition: '.5s' }}
    >
      <MessageWrapper>
        {actor_detail?.id ? (
          <FaceIcon
            style={{
              color: actor_detail.profile_pic,
              marginRight: '4px',
              opacity: 0.8,
              top: '2px',
              position: 'relative'
            }}
          />
        ) : (
          <AnonIcon hex={actor_detail?.color_hex} />
        )}
        <ListItemText
          classes={{ primary: classes.message }}
          primary={
            notiObj.is_response_request
              ? `${notiObj.message} - ${notiObj.question_content}`
              : notiObj.message
          }
        />
      </MessageWrapper>
      <NotiCreatedAt>{getCreatedTime(notiObj.created_at)}</NotiCreatedAt>
    </ListItem>
  );
};

export default NotificationItem;
