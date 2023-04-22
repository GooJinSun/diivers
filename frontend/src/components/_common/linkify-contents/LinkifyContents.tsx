import React, { ReactNode } from 'react';
import Linkify from 'linkify-react';

interface LinkifyContentsProps {
  children: ReactNode;
}

const LinkifyContents = ({ children }: LinkifyContentsProps) => {
  return (
    <Linkify
      options={{
        render: {
          url: ({ content }) => {
            return (
              <a
                target="_blank"
                href={content}
                style={{ color: '#ff395b', textDecoration: 'underline' }}
                rel="noreferrer"
              >
                {content}
              </a>
            );
          }
        }
      }}
    >
      {children}
    </Linkify>
  );
};

export default LinkifyContents;
