import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSampleQuestions } from '@modules/question';
import {
  postSelectedQuestions,
  skipOrCompleteSelectQuestions
} from '@modules/user';
import { CommonButton } from '@styles/buttons';
import { useTranslation } from 'react-i18next';
import {
  QuestionsWrapper,
  TitleWrapper,
  QuestionItem,
  CustomLink
} from './QuestionSelection.styles';

export default function QuestionSelection() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const history = useHistory();

  const sampleQuestions = useSelector(
    (state) => state.questionReducer.sampleQuestions
  );

  const dispatch = useDispatch();

  const [t] = useTranslation('translation', {
    keyPrefix: 'question_selection'
  });

  useEffect(() => {
    dispatch(getSampleQuestions());
  }, [dispatch]);

  const onQuestionSelect = (e) => {
    const { id, selected } = e.target;
    if (!selected) setSelectedQuestions((prev) => [...prev, +id]);
    else
      setSelectedQuestions((prev) => {
        return prev.filter((item) => +item !== +id);
      });
  };

  const sampleQuestionList = sampleQuestions.map((question) => (
    <QuestionItem
      onClick={onQuestionSelect}
      selected={selectedQuestions.includes(question.id)}
      key={question.id}
      id={question.id}
      className="question-item"
    >
      {question.content}
    </QuestionItem>
  ));

  const onClickSubmitButton = async () => {
    dispatch(skipOrCompleteSelectQuestions());
    await dispatch(postSelectedQuestions(selectedQuestions));
    history.push('/home');
  };

  const onClickSkipButton = async () => {
    dispatch(skipOrCompleteSelectQuestions());
    history.push('/home');
  };

  return (
    <QuestionsWrapper>
      <TitleWrapper id="question-selection-title">
        {t('diivers_recommends_new_questions_every_day')}
        <br />
        <div style={{ fontSize: '18px', fontWeight: 500 }}>
          {t('please_pick_at_list_3_questions_that_you_like')}
          &#128522;
        </div>
      </TitleWrapper>
      <div>{sampleQuestionList}</div>
      <CommonButton
        disabled={selectedQuestions.length < 3}
        margin="40px 0"
        onClick={onClickSubmitButton}
        id="complete-button"
      >
        {t('completed')}
      </CommonButton>
      <CustomLink onClick={onClickSkipButton}>{t('skip')}</CustomLink>
    </QuestionsWrapper>
  );
}
