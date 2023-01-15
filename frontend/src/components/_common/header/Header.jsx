import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TextField from '@material-ui/core/TextField';
import useOnClickOutside from 'use-onclickoutside';
import { logout } from '@modules/user';
import { fetchSearchResults } from '@modules/search';
import MobileDrawer from '@mobile-components/mobile-drawer/MobileDrawer';
import MobileFooter from '@mobile-components/mobile-footer/MobileFooter';
import SearchDropdownList from '@common-components/search-dropdown-list/SearchDropdownList';
import useWindowWidth from '@hooks/env/useWindowWidth';
import NotificationDropdownList from './notification-dropdown-list/NotificationDropdownList';
import NavLinkList from './nav-list/NavLinkList';

import { useStyles, HelloUsername } from './Header.styles';

const Header = () => {
  const classes = useStyles();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const notiDropDownRef = useRef(null);
  const searchRef = useRef(null);

  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentUserIsLoading =
    useSelector((state) => state.loadingReducer['user/GET_CURRENT_USER']) ===
    'REQUEST';

  const totalPages = useSelector(
    (state) => state.searchReducer.searchObj?.totalPages
  );

  const notifications = useSelector(
    (state) => state.notiReducer.receivedNotifications
  );

  const unreadNotifications = notifications?.filter((noti) => !noti.is_read);
  const notiBadgeInvisible = unreadNotifications?.length === 0;

  const handleNotiClose = () => {
    setIsNotiOpen(false);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  useOnClickOutside(notiDropDownRef, handleNotiClose);
  useOnClickOutside(searchRef, handleSearchClose);

  const handleClickLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const toggleNotiOpen = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  useEffect(() => {
    dispatch(fetchSearchResults(1, ''));
    // reset search results when mounted
  }, [dispatch]);

  useEffect(() => {
    if (query.length) {
      if (!isSearchOpen) setIsSearchOpen(true);
      dispatch(fetchSearchResults(1, query));
    } else setIsSearchOpen(false);
  }, [query]);

  useEffect(() => {
    if (
      totalPages > 0 &&
      window.location.pathname !== '/user-search' &&
      window.location.pathname !== '/search'
    ) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [dispatch, totalPages]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter' && query !== '') {
      setIsSearchOpen(false);
      history.push(`/search`);
      setQuery('');
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const { isMobile, isDesktopMin } = useWindowWidth();

  const renderHeaderSignedInItems = () => {
    // 데스크톱 최소 화면 width 대응
    if (!isMobile && isDesktopMin) {
      return (
        <>
          <div className={classes.left}>
            <NavLinkList />
          </div>
          <div className={classes.right}>
            <IconButton
              aria-label="show new notifications"
              className={`${classes.iconButton} noti-button`}
              onClick={(e) => {
                e.stopPropagation();
                toggleNotiOpen();
              }}
              disableRipple
              color="secondary"
            >
              <Badge
                variant="dot"
                invisible={notiBadgeInvisible}
                color="primary"
                overlap="rectangular"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              id="drawer-open-button"
              color="secondary"
              aria-label="open drawer"
              edge="end"
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              style={{ display: isDrawerOpen && 'none' }}
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              open={isDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              onLogout={handleClickLogout}
            />
          </div>
        </>
      );
    }

    // 모바일 width 대응
    if (isMobile) {
      return (
        <>
          <IconButton
            id="drawer-open-button"
            color="secondary"
            aria-label="open drawer"
            edge="end"
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            style={{ display: isDrawerOpen && 'none' }}
            className={classes.right}
          >
            <MenuIcon />
          </IconButton>
          <MobileDrawer
            open={isDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            onLogout={handleClickLogout}
          />
        </>
      );
    }

    // 기타 화면 케이스 대응 (일반 데스크톱)
    return (
      <>
        <NavLinkList />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <TextField
            required
            id="input-search-field"
            className={classes.textField}
            InputProps={{
              autoComplete: 'off'
            }}
            size="small"
            value={query}
            label="사용자 검색"
            type="search"
            variant="standard"
            placeholder={query}
            onChange={handleChange}
            onKeyDown={onKeySubmit}
          />
          <IconButton
            aria-label="show new notifications"
            className={`${classes.iconButton} noti-button`}
            onClick={(e) => {
              e.stopPropagation();
              toggleNotiOpen();
            }}
            disableRipple
            color="secondary"
          >
            <Badge
              variant="dot"
              invisible={notiBadgeInvisible}
              color="primary"
              overlap="rectangular"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="account of current user"
            className={classes.iconButton}
            style={{ marginTop: '4px' }}
            disableRipple
            color="secondary"
          >
            <Link to={`/users/${currentUser?.username}`}>
              <AccountCircle color="secondary" />
            </Link>
            <Link to={`/users/${currentUser?.username}`}>
              <HelloUsername className="hello-username">
                {currentUser?.username}
              </HelloUsername>
            </Link>
          </IconButton>
          <Button
            variant="outlined"
            size="medium"
            className={classes.logoutButton}
            style={{
              marginTop: '10px',
              height: '40px',
              marginLeft: '8px'
            }}
            id="logout-button"
            onClick={(e) => {
              e.stopPropagation();
              handleClickLogout();
              setQuery('');
            }}
          >
            로그아웃
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {isMobile && currentUser && (
        <MobileFooter notiBadgeInvisible={notiBadgeInvisible} />
      )}
      <div className={classes.grow}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <Link to="/" className={classes.logo} />
            {currentUserIsLoading ? null : currentUser ? (
              renderHeaderSignedInItems()
            ) : (
              <>
                <div className={classes.grow} />
                <Button
                  component={Link}
                  id="login-link"
                  to="/login"
                  variant="outlined"
                  size="medium"
                  className={classes.logoutButton}
                >
                  로그인
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div ref={notiDropDownRef}>
        {isNotiOpen && (
          <NotificationDropdownList setIsNotiOpen={setIsNotiOpen} />
        )}
      </div>
      <div ref={searchRef}>
        {isSearchOpen && (
          <SearchDropdownList setIsSearchOpen={setIsSearchOpen} />
        )}
      </div>
    </>
  );
};
export default Header;
