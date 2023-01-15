import styled from 'styled-components';
import { DESKTOP_MIN_WIDTH } from '@constants/layout';

export const QuestionsWrapper = styled.div`
  margin: 30px auto;
  @media (min-width: ${DESKTOP_MIN_WIDTH}px) {
    width: 600px;
  }
`;

export const TitleWrapper = styled.div`
  margin: 16px auto;
  word-break: keep-all;
`;

export const QuestionItem = styled.div`
  padding: 12px;
  text-align: center;
  font-size: 15px;
  border: 1px solid;
  border-color: ${(props) => (props.selected ? '#F12C56' : '#ccc')};
  border-radius: 24px;
  margin: 8px 0;
  color: ${(props) => (props.selected ? '#F12C56' : '#777')};
  cursor: pointer !important;
`;
QuestionItem.displayName = 'QuestionItem';

export const CustomLink = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;
CustomLink.displayName = 'CustomLink';
