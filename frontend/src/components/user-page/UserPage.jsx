import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import FaceIcon from '@material-ui/icons/Face';
import { useParams } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import { getSelectedUser } from '@modules/user';
import { getFriendList, deleteFriend } from '@modules/friend';
import FriendStatusButtons from '@common-components/friend-status-buttons/FriendStatusButtons';
import { getSelectedUserPosts, appendPosts } from '@modules/post';
import Message from '@common-components/message/Message';
import axios from '@utils/api';
import UserPostList from './user-post-list/UserPostList';
import UserReportButton from './user-report-button/UserReportButton';
import {
  MobileTabPanel,
  UserPageWrapper,
  UserReportButtonWrapper,
  MobileWrapper,
  useStyles
} from './UserPage.styles';
import { a11yProps } from './tab-panel/TabPanel';

export default function UserPage() {
  const [target, setTarget] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedUser = useSelector((state) => state.userReducer.selectedUser);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const friendList = useSelector((state) => state.friendReducer.friendList);
  const friendIdList = friendList.map((friend) => friend.id);
  const isFriend = friendIdList.includes(selectedUser?.id);
  const isMyPage = selectedUser?.id === currentUser?.id;
  const [isBlock, setIsBlock] = useState(false);
  const [isReport, setIsReport] = useState(false);

  const isFriendOrMyPage = isFriend || isMyPage;

  const [value, setValue] = useState('All');
  const selectedUserPosts = useSelector(
    (state) => state.postReducer.selectedUserPosts
  );

  const isAppending =
    useSelector((state) => state.loadingReducer['post/APPEND_POSTS']) ===
    'REQUEST';
  const isLoading =
    useSelector((state) => state.loadingReducer['post/GET_USER_POSTS']) ===
    'REQUEST';

  const getUserFailure =
    useSelector((state) => state.loadingReducer['user/GET_SELECTED_USER']) ===
    'FAILURE';

  useEffect(() => {
    dispatch(getSelectedUser(id));
    dispatch(getFriendList());
    dispatch(getSelectedUserPosts(id));
    setValue('All');
  }, [dispatch, id]);

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
      dispatch(appendPosts('selectedUser'));
    }
  };

  const userResponses = selectedUserPosts?.filter(
    (post) => post.type === 'Response'
  );

  const userArticles = selectedUserPosts?.filter(
    (post) => post.type === 'Article'
  );

  const userQuestions = selectedUserPosts?.filter(
    (post) => post.type === 'Question'
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickConfirmBlockUser = async () => {
    await axios.post('/user_reports/', {
      reported_user_id: id
    });
  };

  // 사용자 차단 기능 연결
  const onClickBlockUser = () => {
    setIsBlock(true);
  };

  const onClickConfirmReportUser = async () => {
    await axios.post('/user_reports/', {
      reported_user_id: id
    });
  };

  // 사용자 신고 기능 연결 (실제로는 차단과 동일)
  const onClickReportUser = () => {
    setIsReport(true);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const onClickDeleteFriendButton = () => {
    setIsDeleteDialogOpen(true);
  };

  const onCancelDeleteFriend = () => {
    setIsDeleteDialogOpen(false);
  };

  const onConfirmDeleteFriend = () => {
    dispatch(deleteFriend(selectedUser.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <MobileWrapper className={classes.root}>
      {getUserFailure ? (
        <Message message="존재하지 않는 사용자입니다 :(" />
      ) : (
        <>
          <Container fixed>
            <UserPageWrapper
              style={{
                paddingTop: isMyPage ? 50 : 20
              }}
            >
              {!isMyPage && (
                <UserReportButtonWrapper>
                  <UserReportButton
                    onClickBlockUser={onClickBlockUser}
                    onClickReportUser={onClickReportUser}
                    isFriend={isFriend}
                    onClickDeleteFriend={onClickDeleteFriendButton}
                  />
                  <AlertDialog
                    message="친구를 삭제하시겠습니까?"
                    onConfirm={onConfirmDeleteFriend}
                    onClose={onCancelDeleteFriend}
                    isOpen={isDeleteDialogOpen}
                  />
                  {/* 사용자 차단 모달 팝업 */}
                  <AlertDialog
                    onConfirm={onClickConfirmBlockUser}
                    onClose={() => setIsBlock(false)}
                    isOpen={isBlock}
                    message="차단하시겠습니까?"
                  />
                  {/* 사용자 신고 모달 팝업 */}
                  <AlertDialog
                    onConfirm={onClickConfirmReportUser}
                    onClose={() => setIsReport(false)}
                    isOpen={isReport}
                    message="신고하시겠습니까?"
                  />
                </UserReportButtonWrapper>
              )}
              <FaceIcon
                style={{
                  color: selectedUser?.profile_pic
                }}
              />
              <h3 style={{ marginBottom: '10px' }}>{selectedUser?.username}</h3>
              <div>
                {selectedUser && (
                  <FriendStatusButtons
                    isUserPage
                    friendObj={selectedUser}
                    isFriend={selectedUser.are_friends}
                    isPending={selectedUser.received_friend_request_from}
                    hasSentRequest={selectedUser.sent_friend_request_to}
                  />
                )}
              </div>
            </UserPageWrapper>
          </Container>
          <AppBar position="static" className={classes.header}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="user tabs"
            >
              <Tab label="전체" value="All" {...a11yProps('All')} />
              <Tab label="나의 Q&A" value="Q&A" {...a11yProps('Q&A')} />
              <Tab
                label="아무말 대잔치"
                value="Articles"
                {...a11yProps('Articles')}
              />
              <Tab
                label="작성한 질문"
                value="CustomQuestions"
                {...a11yProps('CustomQuestions')}
              />
            </Tabs>
          </AppBar>
          <MobileTabPanel value={value} index="All">
            <UserPostList
              posts={selectedUserPosts}
              isAppending={isAppending}
              isLoading={isLoading}
              isFriendOrMyPage={isFriendOrMyPage}
            />
            <div ref={setTarget} />
          </MobileTabPanel>
          <MobileTabPanel value={value} index="Q&A">
            <UserPostList
              posts={userResponses}
              isAppending={isAppending}
              isLoading={isLoading}
              isFriendOrMyPage={isFriendOrMyPage}
            />
            <div ref={setTarget} />
          </MobileTabPanel>
          <MobileTabPanel value={value} index="Articles">
            <UserPostList
              posts={userArticles}
              isAppending={isAppending}
              isLoading={isLoading}
              isFriendOrMyPage={isFriendOrMyPage}
            />
            <div ref={setTarget} />
          </MobileTabPanel>
          <MobileTabPanel value={value} index="CustomQuestions">
            <UserPostList
              posts={userQuestions}
              isAppending={isAppending}
              isLoading={isLoading}
              isFriendOrMyPage={isFriendOrMyPage}
            />
            <div ref={setTarget} />
          </MobileTabPanel>
        </>
      )}
    </MobileWrapper>
  );
}