import { makeStyles } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import styled from 'styled-components';

export const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    zIndex: 999,
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 12px'
  },
  icon: {
    minWidth: '20vw'
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
