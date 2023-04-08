import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import { CommonButton } from '@styles/buttons';
import { MOBILE_MIN_WIDTH } from '@constants/layout';
import ListItemLink from './list-item-link/ListItemLink';

export const NewQuestionButton = styled(CommonButton)`
  width: 275px;
  box-shadow: '0 5px 10px rgba(154, 160, 185, 0.05), 0 5px 10px rgba(166, 173, 201, 0.2)';
  @media (max-width: ${MOBILE_MIN_WIDTH}px) {
    padding-right: 10px;
    width: 93vw;
  }
`;
NewQuestionButton.displayName = 'NewQuestionButton';

export const QuestionWidgetWrapper = styled.div`
  @media (min-width: 650px) {
    position: fixed;
  }
`;

export const WidgetCard = styled(Card)`
  @media (max-width: ${MOBILE_MIN_WIDTH}px) {
    padding-right: 10px;
    width: 90vw;
  }
`;

export const QuestionListItemLink = styled(ListItemLink)`
  border: 1px solid #e7e7e7;
  width: 100%;
  margin: 8px 0;
  border-radius: 4px;
  word-break: break-all;
`;

export const useStyles = makeStyles((theme) => ({
  card: {
    width: '275px',
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
  iconButton: {
    padding: theme.spacing(0.5)
  },
  icon: {
    fontSize: 24
  },
  list: {
    paddingTop: 0
  },
  question: {
    fontSize: 14
  }
}));
