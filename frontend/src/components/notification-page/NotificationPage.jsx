import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FriendItem from '@common-components/friend-item/FriendItem';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import {
  readNotifications,
  appendNotifications,
  getNotifications,
  getResponseRequests,
  getFriendRequests,
  appendFriendRequests,
  appendResponseRequests
} from '@modules/notification';
import TabPanel, { a11yProps } from '@common-components/tab-panel/TabPanel';
import Message from '@common-components/message/Message';
import { CommonButton } from '@styles/buttons';
import { useHistory } from 'react-router';
import i18n from '@i18n';
import { useTranslation } from 'react-i18next';
import { useStyles } from './NotificationPage.styles';

const READ_ALL_NOTI_DELAY = 1000;

// FIXME: ts 전환시 readonly로 대체
const NOTIFICATION_TABS = {
  ALL: { name: i18n.t('notification_page.all'), index: 0 },
  FRIEND_REQUEST: {
    name: i18n.t('notification_page.friend_requests'),
    index: 1
  },
  RESPONSE_REQUEST: {
    name: i18n.t('notification_page.received_questions'),
    index: 2
  }
};

export default function NotificationPageNotificationPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [target, setTarget] = useState(null);
  const [tab, setTab] = useState(NOTIFICATION_TABS.ALL.index);

  const classes = useStyles();

  const [t] = useTranslation('translation', { keyPrefix: 'notification_page' });

  const notifications = useSelector(
    (state) => state.notiReducer.receivedNotifications
  );
  const friendRequests = useSelector(
    (state) => state.notiReducer.receivedFriendRequests
  );
  const responseRequests = useSelector(
    (state) => state.notiReducer.receivedResponseRequests
  );

  const friendList = useSelector((state) => state.friendReducer.friendList);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const fetchNotifications = useCallback(() => {
    switch (tab) {
      case NOTIFICATION_TABS.ALL.index:
        dispatch(getNotifications());
        break;
      case NOTIFICATION_TABS.FRIEND_REQUEST.index:
        dispatch(getFriendRequests());
        break;
      case NOTIFICATION_TABS.RESPONSE_REQUEST.index:
        dispatch(getResponseRequests());
        break;
      default:
    }
  }, [dispatch, tab]);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        switch (tab) {
          case NOTIFICATION_TABS.ALL.index:
            dispatch(appendNotifications());
            setTimeout(() => {
              dispatch(readNotifications());
            }, READ_ALL_NOTI_DELAY);
            break;
          case NOTIFICATION_TABS.FRIEND_REQUEST.index:
            dispatch(appendFriendRequests());
            break;
          case NOTIFICATION_TABS.RESPONSE_REQUEST.index:
            dispatch(appendResponseRequests());
            break;
          default:
        }
      }
    },
    [dispatch, tab]
  );

  const onClickGoQuestionFeed = () => {
    history.push('/questions');
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(readNotifications());
    }, READ_ALL_NOTI_DELAY);
  }, [dispatch]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  const notificationList = notifications.map((noti) => {
    if (noti.is_friend_request) {
      const isFriend =
        friendList.find((friend) => +friend.id === +noti?.actor_detail?.id) !==
        undefined;
      return (
        <FriendItem
          key={`friend-request-${noti?.target_id}`}
          isFriend={isFriend}
          message={noti.message}
          isPending
          friendObj={noti?.actor_detail}
          showFriendStatus
        />
      );
    }
    return (
      <NotificationItem
        key={`noti-${noti?.id}`}
        notiObj={noti}
        isNotificationPage
      />
    );
  });

  const friendRequestList =
    friendRequests.length === 0 ? (
      <Message
        message={t('no_friend_request')}
        messageDetail={t('search_for_a_friend')}
      />
    ) : (
      friendRequests.map((friendRequestNoti) => {
        return (
          <FriendItem
            key={`friend-request-${friendRequestNoti?.id}`}
            message={friendRequestNoti.message}
            isPending
            friendObj={friendRequestNoti?.actor_detail}
            showFriendStatus
          />
        );
      })
    );

  const responseRequestList =
    responseRequests.length === 0 ? (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Message
          message={t('no_questions_received')}
          messageDetail={t('why_dont_you_send_a_question_to_your_friend_first')}
          noBorder
        />
        <CommonButton
          id="question-redirect-button"
          margin="20px 0"
          onClick={onClickGoQuestionFeed}
          width="50%"
        >
          {t('looking_around_the_question_feed')}
        </CommonButton>
      </div>
    ) : (
      responseRequests.map((responseRequest) => (
        <NotificationItem
          key={`response-request-${responseRequest?.id}`}
          notiObj={responseRequest}
          isNotificationPage
        />
      ))
    );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          aria-label="notification-tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          {Object.values(NOTIFICATION_TABS).map((tabItem) => (
            <Tab
              key={tabItem.index}
              label={tabItem.name}
              {...a11yProps(tabItem.index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel
        value={tab}
        index={NOTIFICATION_TABS.ALL.index}
        className={classes.tabPanel}
      >
        {notificationList}
        <div ref={setTarget} />
      </TabPanel>
      <TabPanel
        value={tab}
        index={NOTIFICATION_TABS.FRIEND_REQUEST.index}
        className={classes.tabPanel}
      >
        {friendRequestList}
        <div ref={setTarget} />
      </TabPanel>
      <TabPanel
        value={tab}
        index={NOTIFICATION_TABS.RESPONSE_REQUEST.index}
        className={classes.tabPanel}
      >
        {responseRequestList}
        <div ref={setTarget} />
      </TabPanel>
    </div>
  );
}
