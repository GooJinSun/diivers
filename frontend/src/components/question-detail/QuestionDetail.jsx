import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useStyles } from './QuestionDetail.styles';

const tabInfos = [
  { index: 0, name: 'all' },
  { index: 1, name: 'friend' },
  { index: 2, name: 'anonymous' }
];

const QuestionDetail = (props) => {
  const classes = useStyles();

  const { match } = props;
  const questionId = match.params.id;

  const [currentTab, setCurrentTab] = React.useState(tabInfos[0]);
  const [target, setTarget] = useState(null);
  const type = currentTab.name.toUpperCase();

  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.questionReducer.selectedQuestion
  );

  const isLoading =
    useSelector(
      (state) =>
        state.loadingReducer[`question/GET_SELECTED_QUESTION_${type}_RESPONSES`]
    ) === 'REQUEST';

  const isAppending =
    useSelector(
      (state) =>
        state.loadingReducer['question/APPEND_SELECTED_QUESTION_RESPONSES']
    ) === 'REQUEST';

  const responses = useSelector(
    (state) => state.questionReducer.selectedQuestionResponses
  );

  const handleTabChange = (_event, newValue) => {
    setCurrentTab(tabInfos[newValue]);
  };

  const onIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        dispatch(
          appendResponsesByQuestionWithType(questionId, currentTab.name)
        );
      }
    },
    [dispatch, questionId, currentTab]
  );

  const resetTabs = () => {
    setCurrentTab(tabInfos[0]);
  };

  const responseList = useMemo(() => {
    return (
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
  }, [isAppending, responses]);

  useEffect(() => {
    return () => {
      resetTabs();
      dispatch(resetSelectedQuestion());
    };
  }, [dispatch]);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect, target]);

  useEffect(() => {
    dispatch(getResponsesByQuestionWithType(questionId, currentTab.name));
  }, [dispatch, questionId, currentTab]);

  const renderTabComponent = useCallback(
    (tab) => {
      return (
        <TabPanel
          value={tab.index}
          index={tab.index}
          className={classes.tabPanel}
        >
          {isLoading ? <LoadingList /> : responseList}
        </TabPanel>
      );
    },
    [classes.tabPanel, isLoading, responseList]
  );

  if (!question) return <></>;
  return (
    <div>
      {question ? (
        <>
          <QuestionItem
            questionObj={question}
            questionId={questionId}
            onResetContent={resetTabs}
          />
          <AppBar position="static" className={classes.header}>
            <Tabs
              value={currentTab.index}
              onChange={handleTabChange}
              aria-label="notification-tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="전체" {...a11yProps(0)} />
              <Tab label="친구" {...a11yProps(1)} />
              <Tab label="익명" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          {responses?.length !== 0 ? (
            tabInfos.map((tab) => {
              return renderTabComponent(tab);
            })
          ) : (
            <Message margin="16px 0" message="표시할 게시물이 없습니다 :(" />
          )}
        </>
      ) : (
        <Message message="존재하지 않는 질문입니다" />
      )}
    </div>
  );
};

export default React.memo(QuestionDetail);
