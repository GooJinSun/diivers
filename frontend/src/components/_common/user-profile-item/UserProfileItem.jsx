import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FaceIcon from '@material-ui/icons/Face';

const UserIcon = styled.span`
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  width: ${(props) => (props.width ? `${props.width}px` : '1em')};
  height: ${(props) => (props.height ? `${props.height}px` : '1em')};
  display: inline-block;
  user-select: none;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

const UserProfileItem = (props) => {
  const {
    profileImageUrl,
    userName,
    width = 24,
    height = 24,
    profileIconColor,
    ...styles
  } = props;

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const refreshProfileImage = useSelector(
    (state) => state.userReducer.refreshProfileImage
  );
  const isMyProfileImageUpdated = useMemo(() => {
    return currentUser?.username === userName && refreshProfileImage !== 0;
  }, [currentUser, refreshProfileImage, userName]);

  return profileImageUrl || isMyProfileImageUpdated ? (
    <UserIcon
      url={`/media/profile_images/${userName}.png?t=${refreshProfileImage}`}
      width={width}
      height={height}
      style={styles}
    />
  ) : (
    <FaceIcon
      style={{
        color: profileIconColor
      }}
    />
  );
};

export default UserProfileItem;
