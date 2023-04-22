import React from 'react';
import * as S from './UserTagSearchList.styles';

type UserTag = {
  id: number;
  username: string;
  profile_image: string;
  profile_pic: string;
  url: string;
};

type UserTagSearchListProps = {
  userTagList: UserTag[];
  onSelectUserTag: (tag: UserTag) => void;
};

const UserTagSearchList: React.FC<UserTagSearchListProps> = ({
  userTagList,
  onSelectUserTag
}) => {
  if (userTagList.length === 0) return <></>;
  return (
    <S.Wrapper>
      {userTagList.map((tag) => (
        <S.UserTagItem key={tag.id} onClick={() => onSelectUserTag(tag)}>
          <div>{tag.username}</div>
        </S.UserTagItem>
      ))}
    </S.Wrapper>
  );
};

export default UserTagSearchList;
