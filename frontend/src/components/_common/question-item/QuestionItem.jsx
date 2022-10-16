import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { TextareaAutosize } from '@material-ui/core';
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
import ShareSettings from '@common-components/share-settings/ShareSettings';
import { PostItemHeaderWrapper, PostItemButtonsWrapper } from '../../../styles';
import QuestionSendModal from './question-send-modal/QuestionSendModal';
import {
  useStyles,
  QuestionItemWrapper,
  Question
} from './QuestionItem.styles';

export default function QuestionItem({
  questionObj,
  onResetContent,
  questionId
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isQuestionList = location.pathname === '/questions';
  const isAnon =
    location?.pathname.includes('anonymous') ||
    location?.search?.includes('anonymous=True');
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const isAuthor = currentUser?.id === questionObj.author_detail.id;

  const classes = useStyles();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [liked, setLiked] = useState(questionObj.current_user_liked);
  const [likeCount, setLikeCount] = useState(questionObj.like_count);
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({
    question_id: questionObj?.id,
    question_detail: questionObj,
    content: '',
    type: 'Response'
  });
  const [isQuestionSendModalOpen, setQuestionSendModalOpen] = useState(false);

  useEffect(() => {
    setNewPost({
      question_id: questionId,
      question_detail: questionObj,
      content: '',
      type: 'Response'
    });
  }, [questionId, questionObj]);

  const handleContentChange = (e) => {
    setNewPost((prev) => ({
      ...prev,
      content: e.target.value
    }));
  };

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

  const handleDelete = () => {
    dispatch(deletePost(questionObj.id, questionObj.type));
  };

  const resetContent = () => {
    setNewPost((prev) => ({ ...prev, content: '' }));
    if (onResetContent) onResetContent();
    setIsWriting(false);
    if (isQuestionList) history.push('/home');
  };

  return (
    <QuestionItemWrapper>
      <AlertDialog
        message="정말 삭제하시겠습니까?"
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
        <>
          <TextareaAutosize
            className={classes.textArea}
            aria-label="new response"
            id="content-input"
            placeholder="답변을 작성해주세요."
            value={newPost.content}
            rowsMin={3}
            onChange={handleContentChange}
          />
          <ShareSettings newPost={newPost} resetContent={resetContent} />
        </>
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
