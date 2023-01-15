import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import useOnClickOutside from 'use-onclickoutside';
import { fetchSearchResults } from '@modules/search';
import SearchDropdownList from '@common-components/search-dropdown-list/SearchDropdownList';
import { useTranslation } from 'react-i18next';
import { SearchTitle, SearchTextField } from './MobileSearchPage.styles';

export default function MobileSearchPage() {
  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const totalPages = useSelector(
    (state) => state.searchReducer.searchObj?.totalPages
  );

  const [t] = useTranslation('translation');

  useEffect(() => {
    dispatch(fetchSearchResults(1, ''));
  }, [dispatch]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  useOnClickOutside(searchRef, handleSearchClose);

  useEffect(() => {
    if (query.length) {
      dispatch(fetchSearchResults(1, query));
      setIsSearchOpen(true);
    } else setIsSearchOpen(false);
  }, [dispatch, query]);

  useEffect(() => {
    if (totalPages > 0) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [totalPages]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter' && query !== '') {
      setIsSearchOpen(false);
      history.push(`/search`);
    }
  };

  return (
    <div>
      <SearchTitle>{t('header.search_for_users')}</SearchTitle>
      <SearchTextField
        required
        id="input-search-field"
        value={query}
        label={t('search_user_page.please_enter_a_search_keyword')}
        type="search"
        variant="outlined"
        placeholder={query}
        onChange={handleChange}
        onKeyDown={onKeySubmit}
        InputProps={{
          autoComplete: 'off',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                id="search-icon"
                aria-label="toggle search"
                onClick={() => history.push('/search')}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <div ref={searchRef} style={{ marginTop: '12px' }}>
        {isSearchOpen && totalPages > 0 && <SearchDropdownList />}
      </div>
    </div>
  );
}
