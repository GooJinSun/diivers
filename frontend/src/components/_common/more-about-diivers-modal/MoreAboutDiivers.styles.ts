import { makeStyles } from '@material-ui/core';
import { modalStyles } from '@styles/modal';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  ...modalStyles(theme),
  select: {
    display: 'block'
  },
  formControl: {
    marginBottom: '10px'
  }
}));

export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
