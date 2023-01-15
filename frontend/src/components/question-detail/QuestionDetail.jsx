import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getResponsesByQuestionWithType,
  appendResponsesByQuestionWithType,
  resetSelectedQuestion
} from '@modules/question';
import LoadingList from '@common-components/loading-list/LoadingList';
import PostItem from '@common-components/post-item/PostItem';
import QuestionItem from '@common-components/question-item/QuestionItem';
import Message from '@common-components/message/Message';
import TabPanel, { a11yProps } from '@common-components/tab-panel/TabPanel';
import { useTranslation } from 'react-i18next';
import { useStyles } from './QuestionDetail.styles';

const QuestionDetail = (props) => {
  const classes = useStyles();

  const { match } = props;
  const questionId = match.params.id;

  const [tab, setTab] = React.useState(0);
  const [tabName, setTabName] = React.useState('all');
  const [target, setTarget] = useState(null);

  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.questionReducer.selectedQuestion
  );

  const isLoading =
    useSelector(
      (state) =>
        state.loadingReducer['question/GET_SELECTED_QUESTION_ALL_RESPONSES']
    ) === 'REQUEST';

  const friendTabisLoading =
    useSelector(
      (state) =>
        state.loadingReducer['question/GET_SELECTED_QUESTION_FRIEND_RESPONSES']
    ) === 'REQUEST';

  const anonymousTabisLoading =
    useSelector(
      (state) =>
        state.loadingReducer[
          'question/GET_SELECTED_QUESTION_ANONYMOUS_RESPONSES'
        ]
    ) === 'REQUEST';

  const isAppending =
    useSelector(
      (state) =>
        state.loadingReducer['question/APPEND_SELECTED_QUESTION_RESPONSES']
    ) === 'REQUEST';

  const responses = useSelector(
    (state) => state.questionReducer.selectedQuestionResponses
  );

  const [t] = useTranslation('translation');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    if (newValue === 0) setTabName('all');
    if (newValue === 1) setTabName('friend');
    if (newValue === 2) setTabName('anonymous');
  };

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(appendResponsesByQuestionWithType(questionId, tabName));
      }
    },
    [dispatch, questionId, tabName]
  );

  useEffect(() => {
    dispatch(getResponsesByQuestionWithType(questionId, tabName));
  }, [dispatch, questionId, tab, tabName]);

  const resetTabs = () => {
    setTab(0);
    setTabName('all');
  };
  useEffect(() => {
    return () => {
      resetTabs();
      dispatch(resetSelectedQuestion());
    };
  }, [dispatch, questionId]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect, target]);

  const responseList = (
    <>
      {responses.map((post) => (
        <PostItem
          postKey={`${post.type}-${post.id}`}
          key={`${post.type}-${post.id}`}
          postObj={post}
          resetAfterComment={resetTabs}
        />
      ))}
      <div ref={setTarget} />
      <div style={{ margin: '8px', textAlign: 'center' }}>
        {isAppending && <CircularProgress id="spinner" color="primary" />}
      </div>
    </>
  );

  return (
    <div>
      {isLoading ? (
        <LoadingList />
      ) : question ? (
        <>
          <QuestionItem
            questionObj={question}
            questionId={questionId}
            onResetContent={() => resetTabs()}
          />
          <AppBar position="static" className={classes.header}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="notification-tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label={t('question_detail.all')} {...a11yProps(0)} />
              <Tab label={t('question_detail.friends')} {...a11yProps(1)} />
              <Tab label={t('question_detail.anonymous')} {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          {responses?.length !== 0 ? (
            <>
              <TabPanel value={tab} index={0} className={classes.tabPanel}>
                {isLoading ? <LoadingList /> : responseList}
              </TabPanel>
              <TabPanel value={tab} index={1} className={classes.tabPanel}>
                {friendTabisLoading ? <LoadingList /> : responseList}
              </TabPanel>
              <TabPanel value={tab} index={2} className={classes.tabPanel}>
                {anonymousTabisLoading ? <LoadingList /> : responseList}
              </TabPanel>
            </>
          ) : (
            <Message
              margin="16px 0"
              message={t('feed_common.there_is_no_posts_to_display')}
            />
          )}
        </>
      ) : (
        <Message message={t('question_detail.this_question_do_not_exit')} />
      )}
    </div>
  );
};

export default withRouter(QuestionDetail);
