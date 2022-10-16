import React, { useState, useEffect } from 'react';
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
} from '../../../styles';
import {
  ContentWrapper,
  CommentWrapper,
  ShareSettingsWrapper,
  ShareSettingInfo,
  CommentInfo
} from './PostItem.styles';

export default function PostItem({
  postObj,
  postKey,
  isDetailPage,
  resetAfterComment
}) {
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
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (postObj) {
      const count = postObj.like_count;
      setLikeCount(+count);
      setLiked(postObj.current_user_liked);
    }
  }, [postObj]);

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

  const handleSubmit = (content, isPrivate) => {
    const newCommentObj = {
      target_type: postObj.type,
      target_id: postObj.id,
      content,
      is_private: isPrivate,
      is_anonymous: isAnon || onlyAnonPost
    };
    dispatch(createComment(newCommentObj, postKey, postObj?.question_id));
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
      <ContentWrapper>{postObj.content}</ContentWrapper>
      <CreateTime createdTime={postObj.created_at} />
      <PostItemFooterWrapper>
        <ShareSettingsWrapper>
          {isAuthor && (
            <>
              {(postObj.share_with_friends || postObj.share_anonymously) && (
                <ShareSettingInfo id="share-title">공개범위:</ShareSettingInfo>
              )}
              {postObj.share_with_friends && (
                <ShareSettingInfo id="share-with-friends">
                  친구
                </ShareSettingInfo>
              )}
              {postObj.share_with_friends && postObj.share_anonymously && (
                <ShareSettingInfo>|</ShareSettingInfo>
              )}
              {postObj.share_anonymously && (
                <ShareSettingInfo id="share-with-anon">익명</ShareSettingInfo>
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
        <NewComment isAnon={isAnon} onSubmit={handleSubmit} />
        <CommentInfo>
          작성된 댓글은
          {isAnon || onlyAnonPost ? ' 익명피드에만  ' : ' 친구들에게만 '}
          공개됩니다.
        </CommentInfo>
      </>
      <AlertDialog
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDelete}
        onClose={onCancelDelete}
        isOpen={isDeleteDialogOpen}
      />
    </PostItemWrapper>
  );
}
