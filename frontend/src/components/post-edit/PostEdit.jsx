import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSelectedPost } from '@modules/post';
import { PostListWrapper } from '@styles/wrappers';
import PostEditItem from './post-edit-item/PostEditItem';

const PostEdit = () => {
  const { postType, id } = useParams();
  const dispatch = useDispatch();

  const selectedPost = useSelector((state) => state.postReducer.selectedPost);

  useEffect(() => {
    dispatch(getSelectedPost(postType, id));
  }, [postType, id, dispatch]);

  return (
    selectedPost && (
      <PostListWrapper>
        <PostEditItem postObj={selectedPost} />
      </PostListWrapper>
    )
  );
};

export default PostEdit;
