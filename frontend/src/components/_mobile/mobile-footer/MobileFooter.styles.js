import { makeStyles } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components';

export const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#fff',
    display: 'flex',
    zIndex: 999
  },
  footer: {
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 12px'
  },
  icon: {
    width: '20%'
  }
});

export const SmallFontBottomNavAction = styled(BottomNavigationAction)`
  .MuiBottomNavigationAction-label {
    font-size: 0.68rem !important;
  }

  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 0.7rem !important;
  }
`;
