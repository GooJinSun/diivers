import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { useSelector } from 'react-redux';
import FriendItem from '@common-components/friend-item/FriendItem';
import { useStyles, SearchCard } from './SearchDropdownList.styles';

const SearchDropdownList = ({ setIsSearchOpen }) => {
  const classes = useStyles();
  const results =
    useSelector((state) => state.searchReducer.searchObj.results) || [];

  if (results.length === 0) return <></>;

  const closeSearchDropDown = () => {
    setIsSearchOpen(false);
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
            onClickCallback={closeSearchDropDown}
          />
        ))}
      </CardContent>
    </SearchCard>
  );
};

export default SearchDropdownList;
