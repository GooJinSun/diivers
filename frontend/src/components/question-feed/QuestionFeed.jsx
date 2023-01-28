import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendDailyQuestions, getDailyQuestions } from '@modules/question';
import CustomQuestionModal from '@common-components/custom-question-modal/CustomQuestionModal';
import { PostListWrapper } from '@styles/wrappers';
import QuestionList from './question-list/QuestionList';
import { NewQuestionButton } from './QuestionFeed.styles';

export default function QuestionFeed() {
  const dailyQuestions = useSelector(
    (state) => state.questionReducer.dailyQuestions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDailyQuestions());
  }, [dispatch]);

  const [target, setTarget] = useState(null);

  const isAppending =
    useSelector(
      (state) => state.loadingReducer['question/APPEND_QUESTIONS']
    ) === 'REQUEST';
  const isLoading =
    useSelector(
      (state) => state.loadingReducer['question/GET_DAILY_QUESTIONS']
    ) === 'REQUEST';

  const [isCustomQuestionModalOpen, setCustomQuestionModalOpen] =
    useState(false);

  const handleModalOpen = () => {
    setCustomQuestionModalOpen(true);
  };

  const handleModalClose = () => {
    setCustomQuestionModalOpen(false);
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting) {
      dispatch(appendDailyQuestions());
    }
  };

  return (
    <>
      <>
        <NewQuestionButton
          id="new-question"
          margin="16px 0"
          onClick={handleModalOpen}
        >
          새로운 질문 만들기
        </NewQuestionButton>
        {isCustomQuestionModalOpen && (
          <CustomQuestionModal
            open={isCustomQuestionModalOpen}
            handleClose={handleModalClose}
          />
        )}
      </>
      <PostListWrapper>
        <QuestionList
          questions={dailyQuestions}
          isAppending={isAppending}
          isLoading={isLoading}
        />
        <div ref={setTarget} />
      </PostListWrapper>
    </>
  );
}
