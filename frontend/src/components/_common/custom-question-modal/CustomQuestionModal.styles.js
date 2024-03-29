import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { modalStyles } from '@styles/modal';

export const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),
  paper: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    outline: 0
  },
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
  },
  submitButton: {
    boxShadow: 'none',
    opacity: 0.8,
    '&:hover': {
      boxShadow: 'none',
      opacity: 1
    }
  },
  submitDetail: {
    fontSize: '12px',
    color: 'grey',
    marginRight: theme.spacing(1)
  }
}));

export const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
