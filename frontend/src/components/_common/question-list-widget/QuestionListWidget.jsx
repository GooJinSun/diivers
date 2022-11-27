import React, { useState, useEffect } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector, useDispatch } from 'react-redux';
import CustomQuestionModal from '@common-components/custom-question-modal/CustomQuestionModal';
import {
  WidgetWrapper,
  WidgetTitleWrapper,
  FlexWrapper
} from '@styles/wrappers';
import {
  getRandomQuestions,
  getDailyQuestions
} from '../../../modules/question';
import {
  useStyles,
  NewQuestionButton,
  QuestionWidgetWrapper,
  WidgetCard,
  QuestionListItemLink
} from './QuestionListWidget.styles';
import { useRecommendedQuestionList } from '../../../queries/questions';

const QuestionListWidget = ({
  initialIsRandomQuestions = false,
  initialIsFolded = false
}) => {
  const classes = useStyles();
  const [isRandomQuestions, setRandomQuestions] = useState(
    initialIsRandomQuestions
  );
  const [isFolded, setIsFolded] = useState(initialIsFolded);
  const [isCustomQuestionModalOpen, setCustomQuestionModalOpen] =
    useState(false);

  const { data: recommendedQuestions = [] } = useRecommendedQuestionList();

  const handleModalOpen = () => {
    setCustomQuestionModalOpen(true);
  };

  const handleModalClose = () => {
    setCustomQuestionModalOpen(false);
  };

  const randomQuestions = useSelector(
    (state) => state.questionReducer.randomQuestions
  );

  const isLoading = useSelector(
    (state) =>
      state.loadingReducer['question/GET_RECOMMENDED_QUESTIONS'] === 'REQUEST'
  );

  const recommendFailure = useSelector(
    (state) =>
      state.loadingReducer['question/GET_RECOMMENDED_QUESTIONS'] === 'FAILURE'
  );

  const getDailyQuestionsSuccess = useSelector(
    (state) =>
      state.loadingReducer['question/GET_DAILY_QUESTIONS'] === 'SUCCESS'
  );

  useEffect(() => {
    if (recommendFailure && getDailyQuestionsSuccess) {
      dispatch(getRandomQuestions());
      setRandomQuestions(true);
    }
  }, [recommendFailure, getDailyQuestionsSuccess]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyQuestions());
    // dispatch(getRecommendedQuestions());
  }, [dispatch]);

  const randomQuestionList = randomQuestions?.slice(0, 5).map((question) => (
    <QuestionListItemLink key={question.id} to={`/questions/${question.id}`}>
      <ListItemText
        classes={{ primary: classes.question }}
        primary={question.content}
      />
    </QuestionListItemLink>
  ));

  const recommendedQuestionList = (recommendedQuestions || randomQuestions)
    .slice(0, 5)
    .map((question) => (
      <QuestionListItemLink key={question.id} to={`/questions/${question.id}`}>
        <ListItemText
          classes={{ primary: classes.question }}
          primary={question.content}
        />
      </QuestionListItemLink>
    ));

  const handleClickRefreshButton = () => {
    if (!isRandomQuestions) {
      setRandomQuestions(true);
    }
    dispatch(getRandomQuestions());
  };

  return (
    <WidgetWrapper>
      <QuestionWidgetWrapper>
        <WidgetCard variant="outlined" className={classes.card}>
          <CardContent className={classes.cardContent}>
            <WidgetTitleWrapper>
              <Typography variant="h6" className={classes.title}>
                추천 질문
              </Typography>
              <FlexWrapper>
                {isFolded ? (
                  <IconButton
                    href=""
                    className={classes.iconButton}
                    id="question-list-widget-unfold-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsFolded(false);
                    }}
                  >
                    <ExpandMoreIcon className={classes.icon} />
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickRefreshButton();
                      }}
                      className={classes.iconButton}
                    >
                      <RefreshIcon className={classes.icon} />
                    </IconButton>
                    <IconButton
                      href=""
                      id="question-list-widget-fold-button"
                      className={classes.iconButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsFolded(true);
                      }}
                    >
                      <ExpandLessIcon className={classes.icon} />
                    </IconButton>
                  </>
                )}
              </FlexWrapper>
            </WidgetTitleWrapper>
            {!isFolded &&
              (isLoading ? (
                <div style={{ margin: '8px', textAlign: 'center' }}>
                  <CircularProgress id="spinner" color="primary" />
                </div>
              ) : (
                <List
                  className={classes.list}
                  aria-label="recommended question list"
                >
                  {isRandomQuestions
                    ? randomQuestionList
                    : recommendedQuestionList}
                </List>
              ))}
          </CardContent>
        </WidgetCard>
        <NewQuestionButton margin="16px 0" onClick={handleModalOpen}>
          새로운 질문 만들기
        </NewQuestionButton>
        {isCustomQuestionModalOpen && (
          <CustomQuestionModal
            open={isCustomQuestionModalOpen}
            handleClose={handleModalClose}
          />
        )}
      </QuestionWidgetWrapper>
    </WidgetWrapper>
  );
};

export default QuestionListWidget;
