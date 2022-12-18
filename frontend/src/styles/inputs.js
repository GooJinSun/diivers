import styled from 'styled-components';

export const CommonInput = styled.input`
  padding: 11px;
  border-radius: 4px;
  color: rgb(50, 50, 50);
  font-size: 16px;
  outline: none;
  width: ${(props) => (props.width ? props.width : '100%')};
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin: 4px 0;
  border-color: ${(props) => props.invalid && '#ff395b'};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #aaa;
  }
  :focus {
    border-color: #008489;
  }
`;
