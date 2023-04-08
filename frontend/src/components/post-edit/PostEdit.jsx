import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSelectedPost } from '@modules/post';
import { PostListWrapper } from '@styles/wrappers';
import PostEditItem from './post-edit-item/PostEditItem';
import LoadingItem from '../post-detail/loading-item/LoadingItem';

const PostEdit = () => {
  const { postType, id } = useParams();
  const dispatch = useDispatch();

  const selectedPost = useSelector((state) => state.postReducer.selectedPost);

  useEffect(() => {
    dispatch(getSelectedPost(postType, id));
  }, [postType, id, dispatch]);

  const isLoading =
    useSelector(
      (state) =>
        state.loadingReducer[
          `post/GET_SELECTED_${postType.toUpperCase().slice(0, -1)}`
        ]
    ) === 'REQUEST';

  return (
    <PostListWrapper>
      {isLoading || !selectedPost ? (
        <LoadingItem />
      ) : (
        <PostEditItem postObj={selectedPost} />
      )}
    </PostListWrapper>
  );
};

export default PostEdit;
