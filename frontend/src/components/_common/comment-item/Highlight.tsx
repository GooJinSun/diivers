import React, { PropsWithChildren } from 'react';

type HighlightProps = {
  username: string;
};

const Highlight: React.FC<PropsWithChildren<HighlightProps>> = ({
  username,
  children
}) => {
  return (
    <a
      href={`/users/${username}`}
      style={{
        color: '#000000',
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 57, 91, 0.4)'
      }}
    >
      {children}
    </a>
  );
};

export default Highlight;
