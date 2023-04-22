import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AlertDiagle.styles';

export default function AlertDialog({ onConfirm, onClose, message, isOpen }) {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText className={classes.p} id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          id="confirm-button"
          onClick={onConfirm}
          color="primary"
          autoFocus
        >
          {t('ok')}
        </Button>
        <Button id="cancel-button" onClick={onClose} color="secondary">
          {t('cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
