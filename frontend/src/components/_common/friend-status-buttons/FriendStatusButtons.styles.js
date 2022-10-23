import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const FriendButton = styled(Button)`
  padding: 5px 0 !important;
  margin: 0 4px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  min-width: 150px;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-end')};
`;
