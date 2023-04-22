import styled from 'styled-components';

const CommonMessage = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const WarningMessage = styled(CommonMessage)`
  color: #ff395b;
`;

export const ConstraintsMessage = styled(CommonMessage)`
  color: #b5b5b5;
`;
