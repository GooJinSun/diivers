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
import { useStyles, ReportButtonWrapper } from './UserButton.styles';

export default function UserReportButton({
  onClickBlockUser,
  onClickReportUser,
  onClickDeleteFriend,
  isFriend
}) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);

  const [t] = useTranslation('translation', { keyPrefix: 'user_page' });

  const ItemText = ({ text }) => (
    <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
  );

  const handleOnClick = (handlingFunction) => {
    handlingFunction();
    setShowButtons(false);
  };

  return (
    <ReportButtonWrapper>
      <IconButton
        color="secondary"
        id="report-button"
        style={{ padding: '4px' }}
        onClick={() => setShowButtons((prev) => !prev)}
      >
        <MoreHorizIcon className="more-button" />
      </IconButton>
      <Grow in={showButtons}>
        <Card className={classes.card}>
          <List>
            <ListItem button>
              <ListItemText
                id="report-user-button"
                primary={<ItemText text={t('report_this_user')} />}
                onClick={() => handleOnClick(onClickReportUser)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                id="block-user-button"
                primary={<ItemText text={t('block_this_user')} />}
                onClick={() => handleOnClick(onClickBlockUser)}
              />
            </ListItem>
            {isFriend && (
              <ListItem button>
                <ListItemText
                  id="block-user-button"
                  primary={<ItemText text={t('break_friends')} />}
                  onClick={() => handleOnClick(onClickDeleteFriend)}
                />
              </ListItem>
            )}
          </List>
        </Card>
      </Grow>
    </ReportButtonWrapper>
  );
}

UserReportButton.displayName = 'UserReportButton';
