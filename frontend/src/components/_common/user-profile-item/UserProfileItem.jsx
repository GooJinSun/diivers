import React from 'react';
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
    width = 24,
    height = 24,
    profileIconColor,
    ...styles
  } = props;

  return profileImageUrl ? (
    <UserIcon
      url={profileImageUrl.replace('http://localhost:8000', '')}
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
