import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  card: {
    width: '100%',
    borderColor: '#eee',
    boxSizing: 'border-box'
  },
  nonBorderCard: {
    width: '100%',
    border: 'none'
  },
  cardContent: {
    padding: '16px !important'
  },
  title: {
    margin: 0,
    textAlign: 'center'
  },
  detail: {
    textAlign: 'center',
    marginTop: '16px'
  }
});
