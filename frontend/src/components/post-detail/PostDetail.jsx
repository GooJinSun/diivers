import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSelectedPost } from '@modules/post';
import PostItem from '@common-components/post-item/PostItem';
import QuestionItem from '@common-components/question-item/QuestionItem';
import Message from '@common-components/message/Message';
import { PostListWrapper } from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import LoadingItem from './loading-item/LoadingItem';

export default function PostDetail() {
  const [t] = useTranslation('translation');
  const selectedPost = useSelector((state) => state.postReducer.selectedPost);
  const selectedPostFailure = useSelector(
    (state) => state.postReducer.selectedPostFailure
  );
  const { postType, id } = useParams();
  const dispatch = useDispatch();

  const isLoading =
    useSelector(
      (state) => state.loadingReducer['post/GET_SELECTED_ARTICLE']
    ) === 'REQUEST';

  useEffect(() => {
    dispatch(getSelectedPost(postType, id));
  }, [postType, id, dispatch]);

  if (selectedPostFailure) {
    return <Message message={t('message.this_post_is_not_accessible')} />;
  }
  if (
    selectedPost?.type === 'Question' ||
    selectedPost?.['content-type'] === 'Question'
  )
    return (
      <div id="post-detail-question">
        {selectedPost && <QuestionItem questionObj={selectedPost} />}
      </div>
    );

  return (
    <PostListWrapper id="post-detail-not-question">
      {isLoading ? (
        <LoadingItem />
      ) : (
        <>
          {selectedPost && (
            <PostItem
              postObj={selectedPost}
              postKey={`${selectedPost.type}-${selectedPost.id}`}
              isDetailPage
            />
          )}
        </>
      )}
    </PostListWrapper>
  );
}
