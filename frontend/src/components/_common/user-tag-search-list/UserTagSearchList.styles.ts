import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  min-width: 100px;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  z-index: 5;
`;

export const UserTagItem = styled.div`
  padding: 4px;
  :hover {
    background-color: #eee;
  }
  cursor: pointer !important;
`;
