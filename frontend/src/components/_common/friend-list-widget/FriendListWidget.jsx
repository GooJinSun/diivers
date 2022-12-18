import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { getFriendList } from '@modules/friend';
import FriendItem from '@common-components/friend-item/FriendItem';
import { WidgetWrapper, WidgetTitleWrapper } from '@styles/wrappers';
import { useStyles } from './FriendListWidget.styles';

const FriendListWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friendReducer.friendList);

  useEffect(() => {
    dispatch(getFriendList());
  }, [dispatch]);

  const friendItemList = friendList?.map((friend) => {
    return <FriendItem key={friend.id} friendObj={friend} />;
  });

  return (
    <WidgetWrapper id="friend-list-widget">
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <WidgetTitleWrapper>
            <Typography variant="h6" className={classes.title}>
              친구
            </Typography>
            <Link to="/my-friends">
              <Button variant="outlined" size="small">
                친구 관리
              </Button>
            </Link>
          </WidgetTitleWrapper>
          <List className={classes.list} aria-label="friend list">
            {friendItemList}
          </List>
        </CardContent>
      </Card>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
