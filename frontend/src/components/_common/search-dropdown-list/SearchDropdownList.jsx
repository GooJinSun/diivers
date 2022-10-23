import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';
import FriendItem from '@common-components/friend-item/FriendItem';
import { useStyles, SearchCard } from './SearchDropdownList.styles';

const SearchDropdownList = () => {
  const classes = useStyles();
  const results = useSelector((state) => state.searchReducer.searchObj.results);

  const userList = results?.map((user) => (
    <FriendItem key={user.id} friendObj={user} />
  ));

  return (
    <SearchCard variant="outlined" px={2} py={1}>
      <CardContent className={classes.searchDropdownContent}>
        {userList}
      </CardContent>
    </SearchCard>
  );
};

export default SearchDropdownList;
