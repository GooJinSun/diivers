import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from 'react-router-dom';
import { getCreatedTime } from '@utils/dateTimeHelpers';
import UserProfileItem from '@common-components/user-profile-item/UserProfileItem';
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
          <UserProfileItem
            userName={actor_detail.username}
            profileImageUrl={actor_detail.profile_image}
            profileIconColor={actor_detail.profile_pic}
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
