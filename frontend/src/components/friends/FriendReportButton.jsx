import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  IconButton,
  Card,
  Grow,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  card: {
    position: 'absolute',
    right: '12px',
    zIndex: 1
  }
}));

const ReportButtonWrapper = styled.div`
  justify-self: right;
`;

const ReportButtonText = styled.div`
  color: #777;
  font-size: 12px;
`;

export default function FriendReportButton({
  onClickBlockUser,
  onClickReportUser
}) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);

  const ItemText = ({ text }) => (
    <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
  );

  return (
    <ReportButtonWrapper>
      <IconButton
        color="secondary"
        id="report-button"
        style={{ padding: '4px' }}
        onClick={() => setShowButtons((prev) => !prev)}
      >
        <ReportButtonText>신고하기</ReportButtonText>
      </IconButton>
      <Grow in={showButtons}>
        <Card className={classes.card}>
          <List style={{ padding: '0' }}>
            <ListItem button>
              <ListItemText
                id="report-user-button"
                primary={<ItemText text="사용자 신고" />}
                onClick={onClickReportUser}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                id="block-user-button"
                primary={<ItemText text="사용자 차단" />}
                onClick={onClickBlockUser}
              />
            </ListItem>
          </List>
        </Card>
      </Grow>
    </ReportButtonWrapper>
  );
}

FriendReportButton.displayName = 'FriendReportButton';
