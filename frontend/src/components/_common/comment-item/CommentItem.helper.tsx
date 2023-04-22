import React from 'react';
import { Comment } from '@models/posts';
import Highlight from './Highlight';

export const getCommentContent = (comment: Comment) => {
  const originalComment = comment.content;
  const userTags = comment.user_tags;

  let lastIndex = 0;
  const result: (string | JSX.Element)[] = [];
  userTags.forEach((tag) => {
    const { tagged_username, offset, length } = tag;
    const prefix = originalComment.substring(lastIndex, offset - 1);
    const highlightedTag = (
      <Highlight key={tag.id} username={tagged_username}>
        @{tagged_username}
      </Highlight>
    );
    result.push(prefix);
    result.push(highlightedTag);
    lastIndex = offset + length;
  });

  result.push(originalComment.substring(lastIndex));

  return result;
};
