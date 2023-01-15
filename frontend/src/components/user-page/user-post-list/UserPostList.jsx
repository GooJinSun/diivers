import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingList from '@common-components/loading-list/LoadingList';
import PostItem from '@common-components/post-item/PostItem';
import QuestionItem from '@common-components/question-item/QuestionItem';
import Message from '@common-components/message/Message';
import { useTranslation } from 'react-i18next';

export default function UserPostList({
  posts,
  isAppending,
  isLoading,
  isFriendOrMyPage
}) {
  const [t] = useTranslation('translation');

  const postList = posts.map((post) => {
    const postKey = `${post.type}-${post.id}`;
    if (post['content-type'] === 'Question' || post.type === 'Question')
      return (
        <QuestionItem
          key={postKey}
          postKey={postKey}
          questionObj={post}
          questionId={post.id}
        />
      );
    return <PostItem key={postKey} postKey={postKey} postObj={post} />;
  });

  if (isFriendOrMyPage === false) {
    return (
      <Message
        message="친구가 아닌 사용자의 게시물은 볼 수 없습니다"
        messageDetail="친구 신청을 해보세요 :)"
        noBorder
      />
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <Message
        message={t('feed_common.there_is_no_posts_to_display')}
        noBorder
      />
    );
  }

  return (
    <div id="post-list">
      {isLoading ? <LoadingList /> : postList}
      <div style={{ margin: '8px', textAlign: 'center' }}>
        {isAppending && <CircularProgress id="spinner" color="primary" />}
      </div>
    </div>
  );
}
