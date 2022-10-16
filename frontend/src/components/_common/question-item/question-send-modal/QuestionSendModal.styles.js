import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1, 2, 2, 2),
    margin: '8px 0'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    paddingBottom: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  list: {
    paddingTop: 0
  }
}));

export const Question = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 15px;
  word-break: break-all;
  padding: 8px;
`;

export const NoFriend = styled.div`
  margin-top: 8px;
  padding: 16px;
  border: none;
  border-radius: 4px;
  text-align: center;
  background: whitesmoke;
`;

NoFriend.displayName = 'NoFriend';
