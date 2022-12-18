import styled from 'styled-components';

export const AuthorProfileWrapper = styled.div`
  cursor: pointer !important;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const AnonIcon = styled.div`
  border-radius: 50%;
  width: 26px;
  height: 26px;
  background: ${(props) => (props.hex ? props.hex : '#f12c56')};
`;
AnonIcon.displayName = 'AnonIcon';
