import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import { getSelectedUser, changeProfileImage } from '@modules/user';
import UserProfileItem from '@common-components/user-profile-item/UserProfileItem';
import { getFriendList, deleteFriend } from '@modules/friend';
import FriendStatusButtons from '@common-components/friend-status-buttons/FriendStatusButtons';
import { getSelectedUserPosts, appendPosts } from '@modules/post';
import Message from '@common-components/message/Message';
import ConfirmAlertDialog from '@common-components/confirm-alert-dialog/ConfirmAlertDialog';
import axios from '@utils/api';
import { PostListWrapper } from '@styles/wrappers';
import EditIcon from '@material-ui/icons/Edit';
import UserPostList from './user-post-list/UserPostList';
import UserReportButton from './user-report-button/UserReportButton';
import {
  MobileTabPanel,
  UserReportButtonWrapper,
  MobileWrapper,
  useStyles,
  UserPageContainer
} from './UserPage.styles';
import { a11yProps } from './tab-panel/TabPanel';

export default function UserPage() {
  const [target, setTarget] = useState(null);
  const { username } = useParams();
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

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(appendPosts('selectedUser'));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getSelectedUser(username));
    dispatch(getFriendList());
    setValue('All');
  }, [dispatch, username]);

  useEffect(() => {
    if (!selectedUser) return;
    dispatch(getSelectedUserPosts(selectedUser.id));
  }, [dispatch, selectedUser, friendList]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

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
    if (!selectedUser) return;
    await axios.post('/user_reports/', {
      reported_user_id: selectedUser.id
    });
  };

  // 사용자 차단 기능 연결
  const onClickBlockUser = () => {
    setIsBlock(true);
  };

  const onClickConfirmReportUser = async () => {
    if (!selectedUser) return;
    await axios.post('/user_reports/', {
      reported_user_id: selectedUser.id
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

  const [isProfileImageAlert, setIsProfileImageAlert] = useState(false);
  const [profileImage, setProfileImage] = useState(undefined);

  const onImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  useEffect(() => {
    if (!profileImage) {
      return;
    }

    if (profileImage.size > 400 * 400) {
      return setIsProfileImageAlert(true);
    }

    const formData = new FormData();
    formData.append('profile_image', profileImage);

    dispatch(changeProfileImage(formData));
  }, [profileImage, dispatch]);

  return (
    <MobileWrapper className={classes.root}>
      {getUserFailure ? (
        <Message message="존재하지 않는 사용자입니다 :(" />
      ) : (
        <PostListWrapper>
          <UserPageContainer
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
            <div
              style={{
                display: 'flex'
              }}
            >
              <UserProfileItem
                profileImageUrl={
                  isMyPage
                    ? currentUser?.profile_image
                    : selectedUser?.profile_image
                }
                profileIconColor={selectedUser?.profile_pic}
              />
              {isMyPage && (
                <label
                  htmlFor="profile-image"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-end',
                    fontSize: 15
                  }}
                >
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={onImageChange}
                    style={{ display: 'none' }}
                  />
                  <EditIcon fontSize="inherit" color="secondary" />
                </label>
              )}
            </div>
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
          </UserPageContainer>
          <AppBar position="static" className={classes.header}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              variant="fullWidth"
              style={{
                width: '100%'
              }}
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
        </PostListWrapper>
      )}
      {isMyPage && (
        <ConfirmAlertDialog
          message={
            '이미지의 크기가 너무 큽니다.\n400 * 400 이하 크기의 이미지를 사용해주세요'
          }
          onConfirm={() => setIsProfileImageAlert(false)}
          onClose={setIsProfileImageAlert}
          isOpen={isProfileImageAlert}
        />
      )}
    </MobileWrapper>
  );
}
