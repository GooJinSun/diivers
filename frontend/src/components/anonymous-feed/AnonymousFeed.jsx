import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '@common-components/post-list/PostList';
import { getPostsByType, appendPosts } from '@modules/post';
import Message from '@common-components/message/Message';

const AnonymousFeed = () => {
  const [target, setTarget] = useState(null);
  const dispatch = useDispatch();
  const anonymousPosts = useSelector(
    (state) => state.postReducer.anonymousPosts
  );
  const isAppending =
    useSelector((state) => state.loadingReducer['post/APPEND_POSTS']) ===
    'REQUEST';
  const isLoading =
    useSelector((state) => state.loadingReducer['post/GET_ANON_POSTS']) ===
    'REQUEST';

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(appendPosts('anonymous'));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getPostsByType('anon'));
  }, [dispatch]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return (
    <>
      {anonymousPosts?.length === 0 && !isLoading ? (
        <Message margin="16px 0" message="표시할 게시물이 없습니다 :(" />
      ) : (
        <>
          <PostList
            posts={anonymousPosts}
            isAppending={isAppending}
            isLoading={isLoading}
          />
          <div ref={setTarget} />
        </>
      )}
    </>
  );
};

export default AnonymousFeed;
