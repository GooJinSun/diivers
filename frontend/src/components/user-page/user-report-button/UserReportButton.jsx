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
import { useStyles, ReportButtonWrapper } from './UserReportButton.styles';

export default function UserReportButton({
  onClickBlockUser,
  onClickReportUser,
  onClickDeleteFriend,
  isFriend
}) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);

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
                primary={<ItemText text="사용자 신고" />}
                onClick={() => handleOnClick(onClickReportUser)}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                id="block-user-button"
                primary={<ItemText text="사용자 차단" />}
                onClick={() => handleOnClick(onClickBlockUser)}
              />
            </ListItem>
            {isFriend && (
              <ListItem button>
                <ListItemText
                  id="block-user-button"
                  primary={<ItemText text="친구 끊기" />}
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
