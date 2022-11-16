import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import NotificationItem from '../components/NotificationItem';
import FriendItem from '../components/friends/FriendItem';
import {
  readAllNotification,
  appendNotifications,
  getNotifications,
  getResponseRequests,
  getFriendRequests,
  appendFriendRequests,
  appendResponseRequests
} from '../modules/notification';

Tabs.displayName = 'Tabs';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  header: {
    backgroundColor: 'white',
    boxShadow:
      '0 5px 10px rgba(154, 160, 185, 0.05), 0 5px 10px rgba(166, 173, 201, 0.2)'
  },
  tabPanel: {
    marginTop: theme.spacing(1)
  },
  readAllButton: {
    margin: '8px 0'
  }
}));

export default function NotificationPageNotificationPage() {
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);
  const [tab, setTab] = useState(0);

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

  const handleReadAllNotification = () => {
    dispatch(readAllNotification());
  };

  const fetchNotifications = useCallback(() => {
    switch (tab) {
      case 0: // all
        dispatch(getNotifications());
        break;
      case 1: // friend requests
        dispatch(getFriendRequests());
        break;
      case 2: // response requests
        dispatch(getResponseRequests());
        break;
      default:
    }
  }, [dispatch, tab]);

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        switch (tab) {
          case 0: // all
            dispatch(appendNotifications());
            break;
          case 1: // friend requests
            dispatch(appendFriendRequests());
            break;
          case 2: // response requests
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
