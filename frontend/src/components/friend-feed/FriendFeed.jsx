import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendPosts, getPostsByType } from '@modules/post';
import { getFriendList } from '@modules/friend';
import NewPost from '@common-components/new-post/NewPost';
import PostList from '@common-components/post-list/PostList';
import Message from '@common-components/message/Message';
import { useTranslation } from 'react-i18next';
import useRouteChange from '@hooks/env/useRouteChange';
import { setScrollY } from '@modules/scroll';
import GoToDraftButton from './go-to-draft-button/GoToDraftButton';

const FriendFeed = () => {
  const [target, setTarget] = useState(false);
  const dispatch = useDispatch();
  const friendPosts = useSelector((state) => state.postReducer.friendPosts);
  const isAppending =
    useSelector((state) => state.loadingReducer['post/APPEND_POSTS']) ===
    'REQUEST';
  const isLoading =
    useSelector((state) => state.loadingReducer['post/GET_FRIEND_POSTS']) ===
    'REQUEST';

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(appendPosts('friend'));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  useEffect(() => {
    dispatch(getPostsByType('friend'));
    dispatch(getFriendList());
  }, [dispatch]);

  const handleStoreScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useRouteChange(handleStoreScroll);

  return (
    <>
      <NewPost />
      <GoToDraftButton />
      {friendPosts?.length === 0 && !isLoading ? (
        <Message
          margin="16px 0"
          message={t('there_is_no_posts_to_display')}
          messageDetail={t('make_friends_with_other_users')}
        />
      ) : (
        <PostList
          posts={friendPosts}
          isAppending={isAppending}
          isLoading={isLoading}
        />
      )}
      <div ref={setTarget} />
    </>
  );
};

export default FriendFeed;
