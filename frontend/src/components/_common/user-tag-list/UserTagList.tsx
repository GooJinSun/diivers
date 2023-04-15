import React from 'react';
import * as S from './UserTagList.styles';

type UserTag = {
  id: number;
  username: string;
  profile_image: string;
  profile_pic: string;
  url: string;
};

type UserTagListProps = {
  userTagList: UserTag[];
  onSelectUserTag: (tag: UserTag) => void;
};

const UserTagList: React.FC<UserTagListProps> = ({
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

export default UserTagList;
