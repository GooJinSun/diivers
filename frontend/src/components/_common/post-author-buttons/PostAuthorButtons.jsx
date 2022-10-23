import React, { useState } from 'react';
import {
  IconButton,
  Card,
  Grow,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useStyles, PostAuthorWrapper } from './PostAuthorButtons.styles';

const ItemText = ({ text }) => (
  <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
);

export default function PostAuthorButtons({
  isQuestion,
  onClickEdit,
  onClickDelete
}) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);
  return (
    <PostAuthorWrapper>
      <IconButton
        aria-label="delete"
        color="secondary"
        id="more-button"
        style={{ padding: '4px' }}
        onClick={() => setShowButtons((prev) => !prev)}
      >
        <MoreHorizIcon className="more-button" />
      </IconButton>
      <Grow in={showButtons}>
        <Card className={classes.card}>
          <List style={{ padding: '0' }}>
            {!isQuestion && (
              <ListItem button>
                <ListItemText
                  id="post-edit-button"
                  primary={<ItemText text="수정하기" />}
                  onClick={onClickEdit}
                />
              </ListItem>
            )}
            <ListItem button>
              <ListItemText
                id="post-delete-button"
                primary={<ItemText text="삭제하기" />}
                onClick={onClickDelete}
              />
            </ListItem>
          </List>
        </Card>
      </Grow>
    </PostAuthorWrapper>
  );
}

PostAuthorWrapper.displayName = 'PostAuthorWrapper';
