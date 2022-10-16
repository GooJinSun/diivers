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
import ConfirmAlertDialog from '@common-components/confirm-alert-dialog/ConfirmAlertDialog';
import AlertDialog from '@common-components/alert-dialog/AlertDialog';
import axios from '@utils/api';
import { useStyles, ReportButtonWrapper } from './PostReportButton.styles';

export default function PostReportButton({ postObj }) {
  const classes = useStyles();
  const [showButtons, setShowButtons] = useState(false);
  const [isReportPost, setIsReportPost] = useState(false);
  const [isReportPostConfirm, setIsReportPostConfirm] = useState(false);
  const [isReportUser, setIsReportUser] = useState(false);
  const [isReportUserConfirm, setIsReportUserConfirm] = useState(false);

  const ItemText = ({ text }) => (
    <Typography style={{ color: '#777', fontSize: 12 }}>{text}</Typography>
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const onClickReportPost = () => {
    setIsReportPost(true);
  };

  const onClickConfirmReportPost = async () => {
    await axios.post('/content_reports/', {
      target_type: postObj.type,
      target_id: postObj.id
    });
    setIsReportPost(false);
    setIsReportPostConfirm(true);
  };

  const onClickReportUser = () => {
    setIsReportUser(true);
  };

  const onClickConfirmReportUser = async () => {
    await axios.post('/user_reports/', {
      reported_user_id: postObj.author_detail.id
    });
    setIsReportUser(false);
    setIsReportUserConfirm(true);
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
      {/* 신고 완료 팝업 */}
      <ConfirmAlertDialog
        onConfirm={refreshPage}
        message="신고가 완료되었습니다."
        isOpen={isReportPostConfirm || isReportUserConfirm}
      />
      {/* 게시글 신고 모달 팝업 */}
      <AlertDialog
        onConfirm={onClickConfirmReportPost}
        onClose={() => setIsReportPost(false)}
        isOpen={isReportPost}
        message="게시글을 신고하시겠습니까?"
      />
      {/* 사용자 신고 모달 팝업 */}
      <AlertDialog
        onConfirm={onClickConfirmReportUser}
        onClose={() => setIsReportUser(false)}
        isOpen={isReportUser}
        message="글쓴이를 신고하시겠습니까?"
      />
    </ReportButtonWrapper>
  );
}

PostReportButton.displayName = 'PostReportButton';
