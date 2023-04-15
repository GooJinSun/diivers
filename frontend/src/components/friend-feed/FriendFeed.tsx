import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from '@modules/friend';
import NewPost from '@common-components/new-post/NewPost';
import PostList from '@common-components/post-list/PostList';
import Message from '@common-components/message/Message';
import { useTranslation } from 'react-i18next';
import { appendPosts, getPostsByType } from '@modules/post';
import { RootState } from '@modules/index';
<<<<<<< HEAD
=======
import ScrollTopButton from '@common-components/scroll-top-button/ScrollTopButton';
>>>>>>> 8ef0db5 (fix: restore ScrollTopButton)
import GoToDraftButton from './go-to-draft-button/GoToDraftButton';

const FriendFeed = () => {
  const target = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const friendPosts = useSelector(
    (state: RootState) => state.postReducer.friendPosts
  );
  const isAppending =
    useSelector(
      (state: RootState) => state.loadingReducer['post/APPEND_POSTS']
    ) === 'REQUEST';
  const isLoading =
    useSelector(
      (state: RootState) => state.loadingReducer['post/GET_FRIEND_POSTS']
    ) === 'REQUEST';

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        dispatch(appendPosts('friend'));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && target.current) {
      observer = new IntersectionObserver(handleObserver, { threshold: 1 });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, handleObserver]);

  useEffect(() => {
    dispatch(getPostsByType('friend'));
    dispatch(getFriendList());
  }, [dispatch]);

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
      <ScrollTopButton
        callback={() => {
          dispatch(getPostsByType('friend'));
        }}
      />
      <div ref={target} />
    </>
  );
};

export default FriendFeed;
