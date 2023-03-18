import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockIcon from '@material-ui/icons/Lock';
import { useLocation, useParams } from 'react-router';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import { createReply, deleteComment } from '@modules/post';
import { likePost, unlikePost } from '@modules/like';
import AuthorProfile from '@common-components/author-profile/AuthorProfile';
import CreateTime from '@common-components/create-time/CreateTime';
import NewComment from '@common-components/new-comment/NewComment';
import { useTranslation } from 'react-i18next';
import {
  updatePostsOnCreateReply,
  updatePostsOnDeleteComment,
  updatePostsOnDeleteReply
} from 'src/queries/posts/updateFriendPostList';
import {
  CommentItemWrapper,
  ReplyIcon,
  CommentContent,
  ReplyWrapper,
  DeleteWrapper,
  IconButton
} from './CommentItem.styles';

export default function CommentItem({
  postKey,
  commentObj,
  isReply = false,
  clickReplyButton,
  isAuthor = false,
  isAnon = false
}) {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const isCommentAuthor = currentUser?.id === commentObj?.author_detail?.id;
  const [isReplyInputOpen, setIsReplyInputOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [liked, setLiked] = useState(commentObj.current_user_liked);
  const [likeCount, setLikeCount] = useState(commentObj.like_count || 0);
  const dispatch = useDispatch();
  const { id: targetId } = useParams();

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const toggleReplyInputOpen = () => {
    clickReplyButton?.();
    setIsReplyInputOpen((prev) => !prev);
  };

  const replyItems = commentObj?.replies?.map((reply) => {
    const isReplyAuthor = currentUser?.id === reply.author_detail?.id;
    if (reply.is_private && !isAuthor && !isReplyAuthor && !isCommentAuthor) {
      return null;
    }
    return (
      <CommentItem
        postKey={postKey}
        className="reply-item"
        key={reply.id}
        isReply
        commentObj={reply}
        isAnon={isAnon}
        clickReplyButton={toggleReplyInputOpen}
      />
    );
  });

  const location = useLocation();

  const handleReplySubmit = async (content, isPrivate) => {
    const newReplyObj = {
      target_type: 'Comment',
      target_id: commentObj.id,
      is_private: isPrivate,
      is_anonymous: commentObj?.is_anonymous,
      content
    };
    const { data: newReply } = await dispatch(
      createReply(newReplyObj, postKey, targetId)
    );

    // FIXME: react-query 확장 적용할 때마다 업데이트 필요
    if (location.pathname === '/home') {
      updatePostsOnCreateReply(postKey, commentObj.id, newReply);
    }
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentObj.id, postKey, isReply, targetId));

    // FIXME: react-query 확장 적용할 때마다 업데이트 필요
    if (location.pathname === '/home') {
      if (isReply) {
        updatePostsOnDeleteReply(postKey, commentObj.id);
      } else {
        updatePostsOnDeleteComment(postKey, commentObj.id);
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const onCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const toggleLike = () => {
    const postInfo = {
      target_type: 'Comment',
      target_id: commentObj.id,
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

  return (
    <>
      <CommentItemWrapper id={commentObj.id}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {isReply && <ReplyIcon />}
            {commentObj.is_private && (
              <LockIcon
                style={{
                  fontSize: '16px',
                  color: 'rgb(187, 187, 187)',
                  margin: '6px 4px 0 0'
                }}
              />
            )}
            <AuthorProfile
              author={commentObj.author_detail}
              isComment
              isAuthor={isCommentAuthor}
            />
            <CommentContent id="comment-content">
              {commentObj.content}
            </CommentContent>
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: `${isReply ? '51px' : '24px'}`
            }}
          >
            <CreateTime createdTime={commentObj.created_at} />
            <ReplyWrapper onClick={toggleReplyInputOpen}>
              {t('reply')}
            </ReplyWrapper>
            {isCommentAuthor && (
              <DeleteWrapper
                onClick={() => setIsDeleteDialogOpen(true)}
                id="delete-comment"
              >
                {t('delete')}
              </DeleteWrapper>
            )}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {isCommentAuthor && (
            <div id="like-count" style={{ margin: '4px', marginTop: '2px' }}>
              {likeCount}
            </div>
          )}
          {liked ? (
            <IconButton color="primary" size="small" onClick={toggleLike}>
              <FavoriteIcon
                style={{ width: '0.75em !important' }}
                className="unlike"
                color="primary"
              />
            </IconButton>
          ) : (
            <IconButton color="primary" size="small" onClick={toggleLike}>
              <FavoriteBorderIcon className="like" color="primary" />
            </IconButton>
          )}
        </div>
      </CommentItemWrapper>
      <div>{replyItems}</div>
      <div>
        {isReplyInputOpen && !isReply && (
          <NewComment
            isReply
            onSubmit={handleReplySubmit}
            forcePrivate={commentObj.is_private}
          />
        )}
        <AlertDialog
          message={t('are_you_sure_you_want_to_delete_it')}
          onConfirm={handleDeleteComment}
          onClose={onCancelDelete}
          isOpen={isDeleteDialogOpen}
        />
      </div>
    </>
  );
}
