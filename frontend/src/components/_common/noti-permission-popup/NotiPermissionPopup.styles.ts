import styled from 'styled-components';

export const StyledNotiPermissionPopup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
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

      &:hover {
        text-decoration: underline;
      }
    }
  }

  button {
    color: white;
  }
`;
