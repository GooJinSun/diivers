import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { modalStyles } from '@styles/modal';

export const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),
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
