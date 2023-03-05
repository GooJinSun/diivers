import styled from 'styled-components';

interface CommonButtonProps {
  width?: number;
  margin?: string;
  sub?: boolean;
}

export const CommonButton = styled.button<CommonButtonProps>`
  padding: 12px 11px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: ${(props) => (props.sub ? '#777' : '#f12c56')};
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: ${(props) => (props.margin ? props.margin : '4px 0')};
  opacity: 0.8;
  :hover {
    opacity: ${(props) => !props.disabled && 1};
  }
  :disabled {
    cursor: default;
    background-color: grey;
  }
`;
CommonButton.displayName = 'CommonButton';

export const AuthSubButton = styled.button`
  float: right;
  border: none;
  background: #fff;
  color: #777;
  font-size: 16px;
`;
