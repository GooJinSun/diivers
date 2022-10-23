import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { primaryColor, borderColor } from '@constants/colors';

export const HelloUsername = styled.div`
  font-size: 16px;
  margin-bottom: 7px;
  margin-left: 12px;
  color: #777;
`;

export const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none'
  },
  right: {
    position: 'absolute',
    right: '16px'
  },
  grow: {
    flexGrow: 1
  },
  header: {
    width: '100vw',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 12px',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0
  },
  logo: {
    width: '130px',
    height: '60px',
    background: 'url("/assets/logo/full-logo.svg") no-repeat',
    backgroundSize: '130px 60px'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    color: 'black',
    fontSize: '28px',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'false'
    }
  },
  tabButton: {
    fontSize: '16px',
    color: borderColor,
    '&:hover': {
      color: primaryColor
    },
    marginLeft: theme.spacing(6)
  },
  tabActive: {
    color: primaryColor
  },
  textField: {
    padding: theme.spacing(1, 1, 1, 0),
    width: '21ch',
    color: 'black',
    fontSize: '13px'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  iconButton: {
    marginRight: theme.spacing(1),
    '&:hover': {
      // you want this to be the same as the backgroundColor above
      backgroundColor: 'transparent',
      color: '#000'
    }
  }
}));
