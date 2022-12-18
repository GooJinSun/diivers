import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const FriendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin: 8px 0;
  padding: 6px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  cursor: pointer !important;
`;
FriendItemWrapper.displayName = 'FriendItemWrapper';

export const FriendLink = styled.div`
  display: flex;
  align-items: center;
  min-width: 50%;
`;

export const useStyles = makeStyles((theme) => ({
  username: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  }
}));
