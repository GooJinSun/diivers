import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -16px;
`;

export const ProfileImageUploadWrapper = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const ProfileImageUploadButton = styled.button`
  padding: 12px 11px;
  border-radius: 4px;
  color: #f12c56;
  font-size: 16px;
  border: 1px solid #f12c56;
  background-color: #ffffff;
`;

export const SelectedProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #ddd;
`;

export const SelectedProfileImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #ddd;
  margin-left: 8px;
  overflow: hidden;
  margin-right: 4px;
`;

export const DeleteButton = styled.div`
  display: flex;
`;
