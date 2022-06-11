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

export default function ReportButton() {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);

  const ItemText = ({ text }) => (
    <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
  );

  // TODO: 게시글 신고 기능 연결
  const onClickReportPost = () => {};

  // TODO: 사용자 신고 기능 연결
  const onClickReportUser = () => {};

  return (
    <ReportButtonWrapper>
      <IconButton
        aria-label="delete"
        color="secondary"
        id="more-button"
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
                id="report-post-button"
                primary={<ItemText text="게시글 신고" />}
                onClick={onClickReportPost}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                id="report-user-button"
                primary={<ItemText text="사용자 신고" />}
                onClick={onClickReportUser}
              />
            </ListItem>
          </List>
        </Card>
      </Grow>
    </ReportButtonWrapper>
  );
}

ReportButton.displayName = 'ReportButton';
