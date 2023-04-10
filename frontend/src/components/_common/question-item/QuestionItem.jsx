import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CreateIcon from '@material-ui/icons/Create';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import AuthorProfile from '@common-components/author-profile/AuthorProfile';
import { mockFriendList } from '@constants';
import { likePost, unlikePost } from '@modules/like';
import { deletePost } from '@modules/post';
import CreateTime from '@common-components/create-time/CreateTime';
import PostAuthorButtons from '@common-components/post-author-buttons/PostAuthorButtons';
import PostReportButton from '@common-components/post-report-button/PostReportButton';
import {
  PostItemHeaderWrapper,
  PostItemButtonsWrapper
} from '@styles/wrappers';
import { useTranslation } from 'react-i18next';
import QuestionSendModal from './question-send-modal/QuestionSendModal';
import { QuestionItemWrapper, Question } from './QuestionItem.styles';
import NewResponse from './new-response/NewResponse';

export default function QuestionItem({ questionObj, onSubmit }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAnon =
    location?.pathname.includes('anonymous') ||
    location?.search?.includes('anonymous=True');
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const isAuthor = currentUser?.id === questionObj.author_detail.id;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [liked, setLiked] = useState(questionObj.current_user_liked);
  const [likeCount, setLikeCount] = useState(questionObj.like_count);
  const [isWriting, setIsWriting] = useState(false);
  const [isQuestionSendModalOpen, setQuestionSendModalOpen] = useState(false);

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

  const toggleLike = () => {
    const postInfo = {
      target_type: questionObj.type,
      target_id: questionObj.id,
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

  const toggleIsWriting = () => {
    setIsWriting(!isWriting);
  };

  const handleSendButton = () => {
    setQuestionSendModalOpen(true);
  };

  const handleModalClose = () => {
    setQuestionSendModalOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deletePost(questionObj.id, questionObj.type));
  };

  const onSubmitHandler = () => {
    onSubmit?.();
    setIsWriting(false);
  };

  return (
    <QuestionItemWrapper>
      <AlertDialog
        message={t('are_you_sure_you_want_to_delete_it')}
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
        isOpen={isDeleteDialogOpen}
      />
      <PostItemHeaderWrapper>
        <AuthorProfile author={questionObj.author_detail} />
        {isAuthor ? (
          <PostAuthorButtons
            isQuestion
            onClickDelete={() => setIsDeleteDialogOpen(true)}
          />
        ) : (
          <PostReportButton postObj={questionObj} />
        )}
      </PostItemHeaderWrapper>
      <Question>
        <Link to={`/questions/${questionObj.id}`}>{questionObj.content}</Link>
      </Question>
      <CreateTime createTime={questionObj.created_at} />
      <PostItemButtonsWrapper>
        <IconButton color="secondary" size="small" onClick={handleSendButton}>
          <SendIcon color="secondary" />
        </IconButton>
        <IconButton color="secondary" size="small" onClick={toggleIsWriting}>
          <CreateIcon color="secondary" />
        </IconButton>
        {liked ? (
          <IconButton color="primary" size="small" onClick={toggleLike}>
            <FavoriteIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton color="primary" size="small" onClick={toggleLike}>
            <FavoriteBorderIcon color="primary" />
          </IconButton>
        )}
        {isAuthor && (
          <div id="like-count" style={{ margin: '4px' }}>
            {likeCount}
          </div>
        )}
      </PostItemButtonsWrapper>
      {isWriting && (
        <NewResponse question={questionObj} onSubmit={onSubmitHandler} />
      )}
      {isQuestionSendModalOpen && (
        <QuestionSendModal
          questionObj={questionObj}
          open={isQuestionSendModalOpen}
          handleClose={handleModalClose}
          friends={mockFriendList}
        />
      )}
    </QuestionItemWrapper>
  );
}
