import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  message: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  },
  listItemWrapper: {
    display: 'block !important'
  },
  notificationPageWrapper: {
    background: '#fff',
    margin: '8px 0',
    padding: '10px 6px',
    border: '1px solid #e7e7e7',
    borderRadius: '4px'
  },
  unread: {
    backgroundColor: 'rgb(255, 57, 91, 0.08)',
    '&:hover': {
      backgroundColor: 'rgb(255, 57, 91, 0.15) !important'
    }
  },
  notiLink: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
  }
}));

export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AnonIcon = styled.div`
  border-radius: 50%;
  width: 21px;
  height: 21px;
  background: ${(props) => (props.hex ? props.hex : '#f12c56')};
  margin-right: 4px;
  margin-left: 2px;
  flex-shrink: 0;
`;
AnonIcon.displayName = 'AnonIcon';

export const NotiCreatedAt = styled.div`
  color: #bbb;
  font-size: 12px;
  margin-left: 35px;
`;
