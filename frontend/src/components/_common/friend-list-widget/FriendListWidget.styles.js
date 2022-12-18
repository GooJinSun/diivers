import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  card: {
    position: 'fixed',
    width: '275px',
    maxHeight: '50vh',
    overflow: 'scroll',
    borderColor: '#eee',
    boxShadow:
      '0 5px 10px rgba(154, 160, 185, 0.05), 0 5px 10px rgba(166, 173, 201, 0.2)'
  },
  cardContent: {
    '&:last-child': { paddingBottom: '0 !important' }
  },
  title: {
    fontWeight: 'bold'
  },
  list: {
    paddingTop: 0
  },
  friend: {
    fontSize: 14
  }
});
