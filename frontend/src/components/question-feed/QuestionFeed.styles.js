import styled from 'styled-components';
import { MOBILE_MIN_WIDTH } from '@constants/layout';

export const NewQuestionButton = styled.button`
  @media (min-width: ${MOBILE_MIN_WIDTH}px) {
    display: none;
  }
  border: 1px solid #f12c56;
  border-radius: 4px;
  padding: 8px 16px;
  color: #f12c56;
  opacity: 0.8;
  font-weight: bold;
  background: white;
  float: right;
  margin-bottom: 16px;
`;
