import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  card: {
    position: 'absolute',
    right: '12px',
    zIndex: 1
  }
}));

export const ReportButtonWrapper = styled.div`
  justify-self: right;
`;
