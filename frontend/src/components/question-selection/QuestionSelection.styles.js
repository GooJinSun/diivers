import styled from 'styled-components';

export const QuestionsWrapper = styled.div`
  margin: 30px auto;
  margin-top: 80px;
  width: 500px;
  @media (max-width: 650px) {
    width: 90%;
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
