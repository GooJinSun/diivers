import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  notificationDropdown: {
    width: 300,
    maxHeight: 500,
    overflow: 'scroll',
    position: 'fixed',
    top: 68,
    right: 50,
    zIndex: 2,
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 12px'
  },
  notificationDropdownContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: '0 !important'
    }
  },
  notiButtons: {
    border: 'none',
    background: 'transparent',
    padding: '8px',
    '&:hover': {
      color: '#F12C56'
    }
  },
  message: {
    color: 'grey',
    fontSize: '14px',
    padding: '8px',
    cursor: 'default'
  }
});

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 0px 16px;
}
`;
