import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionBoxWrapper } from './QuestionBox.styles';

export default function QuestionBox({ questionObj }) {
  return (
    <Link to={`/questions/${questionObj.id}`}>
      <QuestionBoxWrapper>{questionObj.content}</QuestionBoxWrapper>
    </Link>
  );
}
