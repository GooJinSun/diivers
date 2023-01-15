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
import { useTranslation } from 'react-i18next';
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

  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });

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
                  primary={<ItemText text={t('edit')} />}
                  onClick={onClickEdit}
                />
              </ListItem>
            )}
            <ListItem button>
              <ListItemText
                id="post-delete-button"
                primary={<ItemText text={t('delete')} />}
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
