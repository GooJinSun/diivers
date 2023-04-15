import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getFriendList } from '@modules/friend';
import NewPost from '@common-components/new-post/NewPost';
import PostList from '@common-components/post-list/PostList';
import Message from '@common-components/message/Message';
import { useTranslation } from 'react-i18next';
import ScrollTopButton from '@common-components/scroll-top-button/ScrollTopButton';
import { useInfiniteFriendPostList } from 'src/queries/posts';
import { flatMapInfiniteData } from 'src/queries/utils';
import GoToDraftButton from './go-to-draft-button/GoToDraftButton';

const FriendFeed = () => {
  const target = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch: refetchFriendPostList
  } = useInfiniteFriendPostList();

  // TODO(지나): 나중에 범용적인 툴로 빼서 만들기
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = target.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1
    });
    observer.observe(element as Element);
    return () => observer.unobserve(element as Element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  useEffect(() => {
    dispatch(getFriendList());
  }, [dispatch]);

  const friendPosts = flatMapInfiniteData(data, 'results', 'id');

  return (
    <>
      <NewPost />
      <GoToDraftButton />
      {friendPosts?.length === 0 && !isFetching ? (
        <Message
          margin="16px 0"
          message={t('there_is_no_posts_to_display')}
          messageDetail={t('make_friends_with_other_users') || ''}
          noBorder={undefined}
        />
      ) : (
        <PostList
          posts={friendPosts}
          isAppending={isFetchingNextPage}
          isLoading={isFetching}
        />
      )}
      <ScrollTopButton callback={refetchFriendPostList} />
      <div ref={target} />
    </>
  );
};

export default FriendFeed;
