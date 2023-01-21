import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const NewPostWrapper = styled.div`
  @media (max-width: 650px) {
    width: 100%;
    box-shadow: 0 2px 2px rgba(154, 160, 185, 0.05),
      0 5px 5px rgba(166, 173, 201, 0.1);
  }
  width: 100%;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 16px;
`;

export const useStyles = makeStyles({
  textarea: {
    padding: '5px',
    borderRadius: '2px',
    color: 'rgb(50, 50, 50)',
    fontSize: '14px',
    outline: 'none !important',
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
    border: 'none',
    margin: '4px 0',
    background: '#fff',
    cursor: 'auto',
    resize: 'none',
    overflow: 'hidden',
    fontFamily: 'Noto Sans KR, sans-serif'
  }
});
