import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const NewCommentWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

NewCommentWrapper.displayName = 'NewCommentWrapper';

export const useStyles = makeStyles({
  textarea: {
    flexGrow: '1',
    padding: '6px',
    margin: '4px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    resize: 'none',
    cursor: 'auto',
    boxSizing: 'border-box',
    fontFamily: 'Noto Sans KR, sans-serif',
    outline: 'none !important'
  }
});

export const PrivateWrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  margin: 0 4px 0 8px;
  @media (max-width: 650px) {
    margin: 0 4px;
    font-size: 11px;
    flex-shrink: 0;
  }
  color: grey;
`;
