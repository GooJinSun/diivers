import styled from 'styled-components';
import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const QuestionItemWrapper = styled.div`
  @media (max-width: 650px) {
    border: 1px solid #e7e7e7;
    box-shadow: 0 2px 2px rgba(154, 160, 185, 0.05),
      0 5px 5px rgba(166, 173, 201, 0.1);
  }
  background: #f4f4f4;
  padding: 12px;
  border-radius: 4px;
  margin: 16px 0;
  position: relative;
`;
QuestionItemWrapper.displayName = 'QuestionItemWrapper';

export const Question = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  word-break: break-all;
  padding: 8px 0;
  white-space: pre-wrap;
  @media (max-width: 650px) {
    padding: 16px;
  }
`;
TextareaAutosize.displayName = 'TextareaAutosize';

export const useStyles = makeStyles((theme) => ({
  textArea: {
    background: 'white',
    width: '100%',
    border: 'none',
    resize: 'none',
    padding: theme.spacing(1),
    outline: 'none !important',
    boxSizing: 'border-box',
    margin: '8px 0',
    fontFamily: 'Noto Sans KR',
    fontsize: '14px'
  }
}));
