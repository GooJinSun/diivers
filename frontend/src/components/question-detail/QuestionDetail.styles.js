import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const QuestionDetailWrapper = styled.div`
  width: 100%;
`;

export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'white',
    boxShadow:
      '0 5px 10px rgba(154, 160, 185, 0.05), 0 5px 10px rgba(166, 173, 201, 0.2)'
  },
  tabPanel: {
    marginTop: theme.spacing(1)
  }
}));
