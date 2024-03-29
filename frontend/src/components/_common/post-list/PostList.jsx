import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingList from '@common-components/loading-list/LoadingList';
import PostItem from '@common-components/post-item/PostItem';
import QuestionItem from '@common-components/question-item/QuestionItem';
import { PostListWrapper } from '@styles/wrappers';

export default function PostList({ posts, isAppending, isLoading }) {
  const postList = posts.map((post) => {
    const postKey = `${post.type}-${post.id}`;
    if (post['content-type'] === 'Question' || post.type === 'Question')
      return <QuestionItem key={postKey} questionObj={post} />;
    return <PostItem key={postKey} postKey={postKey} postObj={post} />;
  });

  return (
    <PostListWrapper id="post-list">
      {isLoading ? <LoadingList /> : postList}
      <div style={{ margin: '8px', textAlign: 'center' }}>
        {isAppending && <CircularProgress id="spinner" color="primary" />}
      </div>
    </PostListWrapper>
  );
}
