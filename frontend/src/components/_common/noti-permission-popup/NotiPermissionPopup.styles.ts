import styled from 'styled-components';

interface StyledNotiPermissionPopupProps {
  isMobile: boolean;
}
export const StyledNotiPermissionPopup = styled.div<StyledNotiPermissionPopupProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: ${(props) => (props.isMobile ? '56px' : 0)};
  width: 100%;
  background-color: #f12c56;
  padding: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      color: white;
      font-size: 18px;
      text-decoration: underline;
    }

    a {
      display: block;
      color: white;
      text-align: center;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  button {
    color: white;
  }
`;
