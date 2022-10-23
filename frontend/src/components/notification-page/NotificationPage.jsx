import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import FriendItem from '@common-components/friend-item/FriendItem';
import NotificationItem from '@common-components/notification-item/NotificationItem';
import {
  readAllNotification,
  appendNotifications
} from '@modules/notification';
import TabPanel, { a11yProps } from '@common-components/tab-panel/TabPanel';
import { useStyles, ButtonWrapper } from './NotificationPage.styles';

export default function NotificationPage({ tabType }) {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendReducer.friendList);
  const classes = useStyles();
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      dispatch(appendNotifications());
    }
  };

  let initialTab = 0;
  if (tabType === 'FriendRequest') {
    initialTab = 1;
  } else if (tabType === 'ResponseRequest') {
    initialTab = 2;
  }

  const [tab, setTab] = React.useState(initialTab);
  const notifications = useSelector(
    (state) => state.notiReducer.receivedNotifications
  );

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleReadAllNotification = () => {
    dispatch(readAllNotification());
  };

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

  const friendRequestList = notifications
    .filter((noti) => noti.is_friend_request)
    .map((friendRequestNoti) => {
      return (
        <FriendItem
          key={`friend-request-${friendRequestNoti?.id}`}
          message={friendRequestNoti.message}
          isPending
          friendObj={friendRequestNoti?.actor_detail}
        />
      );
    });

  const responseRequestList = notifications
    .filter((noti) => noti.is_response_request)
    .map((responseRequest) => (
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
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="친구 요청" {...a11yProps(1)} />
          <Tab label="받은 질문" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <ButtonWrapper>
        <Button
          size="medium"
          className={`read-all-notifications ${classes.readAllButton}`}
          onClick={handleReadAllNotification}
          color="primary"
        >
          모두 읽음
        </Button>
      </ButtonWrapper>
      <TabPanel value={tab} index={0} className={classes.tabPanel}>
        {notificationList}
        <div ref={setTarget} />
      </TabPanel>
      <TabPanel value={tab} index={1} className={classes.tabPanel}>
        {friendRequestList}
        <div ref={setTarget} />
      </TabPanel>
      <TabPanel value={tab} index={2} className={classes.tabPanel}>
        {responseRequestList}
        <div ref={setTarget} />
      </TabPanel>
    </div>
  );
}
