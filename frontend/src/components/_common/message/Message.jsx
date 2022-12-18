import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './Message.styles';

const Message = ({ margin, message, messageDetail, noBorder }) => {
  const classes = useStyles();
  return (
    <Card
      className={noBorder ? classes.nonBorderCard : classes.card}
      variant="outlined"
      style={{ margin }}
    >
      <CardContent className={classes.cardContent}>
        {message && <h2 className={classes.title}>{message}</h2>}
        {messageDetail && <div className={classes.detail}>{messageDetail}</div>}
      </CardContent>
    </Card>
  );
};

export default Message;
