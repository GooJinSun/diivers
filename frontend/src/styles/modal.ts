import { Theme } from '@material-ui/core';

interface ModalStyles {
  content: any;
  modalTitle: any;
  closeButton: any;
}
export const modalStyles = (theme: Theme): ModalStyles => ({
  content: {
    padding: theme.spacing(1, 2, 2, 2),
    margin: '8px 0'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    paddingBottom: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});
