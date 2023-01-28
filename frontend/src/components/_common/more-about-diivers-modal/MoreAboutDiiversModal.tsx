import React from 'react';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './MoreAboutDiivers.styles';

interface MoreAboutDiiversModalProps {
  open: boolean;
  handleClose: () => void;
}

const MoreAboutDiiversModal = ({
  open,
  handleClose
}: MoreAboutDiiversModalProps) => {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        다이버스에 대해 더 알아보기
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    </Dialog>
  );
};

export default MoreAboutDiiversModal;
