import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import CommentItem from '@common-components/comment-item/CommentItem';
import NewComment from '@common-components/new-comment/NewComment';
import AuthorProfile from '@common-components/author-profile/AuthorProfile';
import CreateTime from '@common-components/create-time/CreateTime';
import PostAuthorButtons from '@common-components/post-author-buttons/PostAuthorButtons';
import PostReportButton from '@common-components/post-report-button/PostReportButton';
import QuestionBox from '@common-components/question-box/QuestionBox';
import { likePost, unlikePost } from '@modules/like';
import { createComment, deletePost } from '@modules/post';
import {
  PostItemHeaderWrapper,
  PostItemFooterWrapper,
  PostItemWrapper,
  PostItemButtonsWrapper
} from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import useMutateFriendPostList from 'src/queries/posts/useMutateFriendPostList';
import {
  ContentWrapper,
  CommentWrapper,
  ShareSettingsWrapper,
  ShareSettingInfo,
  CommentInfo
} from './PostItem.styles';
import LinkifyContents from '../linkify-contents/LinkifyContents';

export default function PostItem({
  postObj,
  postKey,
  isDetailPage,
  resetAfterComment
}) {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const { pathname, search } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const isAuthor =
    postObj?.author && currentUser?.id === postObj.author_detail?.id;
  const isAnon =
    !postObj?.author_detail?.id ||
    pathname?.includes('anonymous') ||
    search?.includes('anonymous=True');
  const onlyAnonPost =
    postObj?.share_anonymously && !postObj?.share_with_friends;

  const [liked, setLiked] = useState(postObj.current_user_liked || false);
  const [likeCount, setLikeCount] = useState(postObj.like_count || 0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const commentList = postObj?.comments?.map((comment) => {
    if (!comment) return null;
    const isCommentAuthor = comment.author_detail?.id === currentUser?.id;
    if (comment.is_private && !(isAuthor || isCommentAuthor)) return null;
    return (
      <CommentItem
        isAnon={isAnon || onlyAnonPost}
        postKey={postKey}
        key={comment.id}
        commentObj={comment}
        isAuthor={isAuthor}
      />
    );
  });

  const onCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const location = useLocation();
  const { mutateOnCreateComment, mutateOnDeletePost } =
    useMutateFriendPostList();

  const handleSubmit = async (content, isPrivate) => {
    const newCommentObj = {
      target_type: postObj.type,
      target_id: postObj.id,
      content,
      is_private: isPrivate,
      is_anonymous: isAnon || onlyAnonPost
    };
    const { data: newComment } = await dispatch(
      createComment(newCommentObj, postKey, postObj?.question_id)
    );

    // FIXME: react-query 확장 적용할 때마다 업데이트 필요
    if (location.pathname === '/home') {
      mutateOnCreateComment(`${postObj.type}-${postObj.id}`, newComment);
    }
    if (resetAfterComment) resetAfterComment();
  };

  const toggleLike = () => {
    const postInfo = {
      target_type: postObj.type,
      target_id: postObj.id,
      is_anonymous: isAnon
    };
    if (liked) {
      setLikeCount((prev) => prev - 1);
      dispatch(unlikePost(postInfo));
    } else {
      setLikeCount((prev) => prev + 1);
      dispatch(likePost(postInfo));
    }
    setLiked((prev) => !prev);
  };

  const handleEdit = () => {
    history.push(`/${postObj.type.toLowerCase()}s/${postObj.id}/edit`);
  };

  const handleDelete = () => {
    dispatch(deletePost(postObj.id, postObj.type));
    setIsDeleteDialogOpen(false);

    // FIXME: react-query 확장 적용할 때마다 업데이트 필요
    if (location.pathname === '/home') {
      mutateOnDeletePost(`${postObj.type}-${postObj.id}`);
    }

    if (isDetailPage) history.replace('/');
  };

  return (
    <PostItemWrapper>
      <PostItemHeaderWrapper>
        <AuthorProfile
          author={postObj && postObj.author_detail}
          isAuthor={isAuthor}
        />
        {isAuthor ? (
          <PostAuthorButtons
            isQuestion={false}
            onClickEdit={handleEdit}
            onClickDelete={() => setIsDeleteDialogOpen(true)}
          />
        ) : (
          <PostReportButton postObj={postObj} />
        )}
      </PostItemHeaderWrapper>
      {postObj.question && <QuestionBox questionObj={postObj.question} />}
      <ContentWrapper>
        <LinkifyContents>{postObj.content}</LinkifyContents>
      </ContentWrapper>
      <CreateTime createdTime={postObj.created_at} />
      <PostItemFooterWrapper>
        <ShareSettingsWrapper>
          {isAuthor && (
            <>
              {(postObj.share_with_friends || postObj.share_anonymously) && (
                <ShareSettingInfo id="share-title">
                  {t('scope_of_disclosure')}
                  <span>: </span>
                </ShareSettingInfo>
              )}
              {postObj.share_with_friends && (
                <ShareSettingInfo id="share-with-friends">
                  {t('friends')}
                </ShareSettingInfo>
              )}
              {postObj.share_with_friends && postObj.share_anonymously && (
                <ShareSettingInfo>|</ShareSettingInfo>
              )}
              {postObj.share_anonymously && (
                <ShareSettingInfo id="share-with-anon">
                  {t('anonymous')}
                </ShareSettingInfo>
              )}
            </>
          )}
        </ShareSettingsWrapper>

        <PostItemButtonsWrapper>
          {liked ? (
            <IconButton color="primary" size="small" onClick={toggleLike}>
              <FavoriteIcon className="unlike" color="primary" />
            </IconButton>
          ) : (
            <IconButton color="primary" size="small" onClick={toggleLike}>
              <FavoriteBorderIcon className="like" color="primary" />
            </IconButton>
          )}
          {isAuthor && (
            <div id="like-count" style={{ margin: '4px' }}>
              {likeCount}
            </div>
          )}
        </PostItemButtonsWrapper>
      </PostItemFooterWrapper>
      <div style={{ borderTop: '1px solid #eee', margin: '8px 0' }} />
      <>
        <CommentWrapper>{commentList}</CommentWrapper>
        <NewComment isPostAnon={isAnon} onSubmit={handleSubmit} />
        <CommentInfo>
          {isAnon || onlyAnonPost
            ? t('comments_are_only_visible_to_anonymous_feed')
            : t('comments_are_only_visible_to_your_friends')}
        </CommentInfo>
      </>
      <AlertDialog
        message={t('are_you_sure_you_want_to_delete_it')}
        onConfirm={handleDelete}
        onClose={onCancelDelete}
        isOpen={isDeleteDialogOpen}
      />
    </PostItemWrapper>
  );
}
