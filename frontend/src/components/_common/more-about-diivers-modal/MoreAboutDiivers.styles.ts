import { makeStyles } from '@material-ui/core';
import { modalStyles } from '@styles/modal';

export const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),
  select: {
    display: 'block'
  },
  formControl: {
    marginBottom: '10px'
  }
}));
