import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FriendItem from '@common-components/friend-item/FriendItem';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import {
  readAllNotification,
  appendNotifications,
  getNotifications,
  getResponseRequests,
  getFriendRequests,
  appendFriendRequests,
  appendResponseRequests
} from '@modules/notification';
import TabPanel, { a11yProps } from '@common-components/tab-panel/TabPanel';
import { useStyles } from './NotificationPage.styles';

const READ_ALL_NOTI_DELAY = 300;

// FIXME: ts 전환시 readonly로 대체
const NOTIFICATION_TABS = {
  ALL: { name: '전체', index: 0 },
  FRIEND_REQUEST: { name: '친구 요청', index: 1 },
  RESPONSE_REQUEST: { name: '받은 질문', index: 2 }
};

export default function NotificationPageNotificationPage() {
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);
  const [tab, setTab] = useState(NOTIFICATION_TABS.ALL.index);

  const classes = useStyles();

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

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(readAllNotification());
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

  const friendRequestList = friendRequests.map((friendRequestNoti) => {
    return (
      <FriendItem
        key={`friend-request-${friendRequestNoti?.id}`}
        message={friendRequestNoti.message}
        isPending
        friendObj={friendRequestNoti?.actor_detail}
        showFriendStatus
      />
    );
  });

  const responseRequestList = responseRequests.map((responseRequest) => (
    <NotificationItem
      key={`response-request-${responseRequest?.id}`}
      notiObj={responseRequest}
      isNotificationPage
    />
  ));

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
