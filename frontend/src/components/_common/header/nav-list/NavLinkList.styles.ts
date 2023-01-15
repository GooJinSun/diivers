import { makeStyles } from '@material-ui/core/styles';
import { primaryColor, borderColor } from '@constants/colors';

export const useStyles = makeStyles((theme) => ({
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
  }
}));
