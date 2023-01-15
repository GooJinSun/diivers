import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useTranslation } from 'react-i18next';

export default function ConfirmAlertDialog({ onConfirm, message, isOpen }) {
  const [t] = useTranslation('translation', { keyPrefix: 'feed_common' });
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
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
      </DialogActions>
    </Dialog>
  );
}
