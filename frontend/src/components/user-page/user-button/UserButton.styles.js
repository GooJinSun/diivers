import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  card: {
    position: 'absolute',
    right: '6px',
    zIndex: 1,
    width: 'max-content'
  }
}));

export const ReportButtonWrapper = styled.div`
  justify-self: right;
  position: relative;
`;
