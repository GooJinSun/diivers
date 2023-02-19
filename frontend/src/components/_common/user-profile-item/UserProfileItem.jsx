import React from 'react';
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

  const currentUserName = useSelector(
    (state) => state.userReducer.currentUser?.username
  );
  const currentUserProfileImage = useSelector(
    (state) => state.userReducer.currentUser?.profile_image
  );
  const profileImageUpdatedAt = useSelector(
    (state) => state.userReducer.profileImageUpdatedAt
  );

  const isMyProfileImageUpdated =
    currentUserName === userName && currentUserProfileImage;

  return profileImageUrl || isMyProfileImageUpdated ? (
    <UserIcon
      url={`/media/profile_images/${userName}.png?t=${profileImageUpdatedAt}`}
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
