import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UserProfileItem from '@common-components/user-profile-item/UserProfileItem';
import { AuthorProfileWrapper, AnonIcon } from './AuthorProfile.styles';

export default function AuthorProfile({
  author,
  isComment = false,
  isAuthor = false
}) {
  const location = useLocation();
  const history = useHistory();
  const isAnonFeed = location?.pathname === '/anonymous';

  if (!author) return null;
  const {
    id,
    username,
    profile_pic: picHex,
    color_hex: hex,
    profile_image: profileImageUrl
  } = author;

  const onClickProfile = () => {
    history.push(`/users/${username}`);
  };

  return (
    <AuthorProfileWrapper onClick={onClickProfile}>
      {id && (!isAnonFeed || isAuthor) ? (
        <div
          style={{
            marginRight: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <UserProfileItem
            profileImageUrl={profileImageUrl}
            profileIconColor={picHex}
          />
        </div>
      ) : (
        <AnonIcon
          style={{
            marginTop: isComment && '4px',
            marginRight: !isComment && '4px',
            width: isComment && '18px',
            height: isComment && '18px'
          }}
          hex={hex}
        />
      )}

      {username && (!isAnonFeed || isAuthor) && (
        <div
          style={{
            minWidth: 'max-content',
            fontSize: isComment ? '12px' : '14px'
          }}
        >
          {username}
        </div>
      )}
    </AuthorProfileWrapper>
  );
}
