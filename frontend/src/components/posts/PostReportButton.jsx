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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { reportPost } from '../../modules/post';

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

export default function PostReportButton({ postObj }) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();

  const ItemText = ({ text }) => (
    <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
  );

  // TODO: 게시글 신고 기능 연결
  const onClickReportPost = async () => {
    await dispatch(
      reportPost({
        target_type: postObj.type,
        target_id: postObj.id
      })
    );
  };

  // TODO: 사용자 신고 기능 연결
  const onClickReportUser = () => {};

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

PostReportButton.displayName = 'PostReportButton';
