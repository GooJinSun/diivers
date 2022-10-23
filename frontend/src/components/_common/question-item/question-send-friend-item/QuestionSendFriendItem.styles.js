import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const SendButton = withStyles({
  root: {
    boxShadow: 'none',
    outline: 'none',
    opacity: 0.8,
    '&:hover': {
      boxShadow: 'none',
      opacity: 1
    },
    '&:active': {
      boxShadow: 'none',
      opacity: 1
    }
  }
})(Button);

export const useStyles = makeStyles((theme) => ({
  username: {
    fontSize: 14,
    marginLeft: theme.spacing(1)
  },
  button: {
    height: '30px'
  }
}));
