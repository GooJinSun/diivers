import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';
import FriendItem from '@common-components/friend-item/FriendItem';
import { useHistory } from 'react-router';
import { useStyles, SearchCard } from './SearchDropdownList.styles';

const SearchDropdownList = ({ setIsSearchOpen }) => {
  const classes = useStyles();
  const results =
    useSelector((state) => state.searchReducer.searchObj.results) || [];
  const history = useHistory();

  if (results.length === 0) return <></>;

  const onClickItem = (user) => {
    setIsSearchOpen(false);
    history.push(`/users/${user.username}`);
  };

  return (
    <SearchCard
      variant="outlined"
      px={2}
      py={1}
      style={{
        overflowY: 'scroll'
      }}
    >
      <CardContent className={classes.searchDropdownContent}>
        {results.map((user) => (
          <FriendItem
            key={user.id}
            friendObj={user}
            onClickItem={() => onClickItem(user)}
          />
        ))}
      </CardContent>
    </SearchCard>
  );
};

export default SearchDropdownList;
