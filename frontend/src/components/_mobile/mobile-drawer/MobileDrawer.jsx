import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SearchIcon from '@material-ui/icons/Search';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useStyles, MarginListItem, Mask } from './MobileDrawer.styles';

export default function MobileDrawer({ open, handleDrawerClose, onLogout }) {
  const history = useHistory();
  const classes = useStyles();

  const [t] = useTranslation('translation', { keyPrefix: 'mobile.drawer' });
  return (
    <div id="drawer-wrapper">
      {open && (
        <Mask id="mask" className={classes.mask} onClick={handleDrawerClose} />
      )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            style={{ width: '40vw', paddingLeft: '30vw' }}
            onClick={handleDrawerClose}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MarginListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('friends')}
              id="friend"
              onClick={() => {
                history.push('/my-friends');
                handleDrawerClose();
              }}
            />
          </MarginListItem>
          <MarginListItem button>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('recommended_questions')}
              id="question"
              onClick={() => {
                history.push('/recommended-questions');
                handleDrawerClose();
              }}
            />
          </MarginListItem>
          <MarginListItem button>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText
              id="search"
              primary={t('search_for_users')}
              onClick={() => {
                history.push('/user-search');
                handleDrawerClose();
              }}
            />
          </MarginListItem>
          <MarginListItem
            id="logout"
            button
            onClick={() => {
              onLogout();
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t('logout')} />
          </MarginListItem>
        </List>
      </Drawer>
    </div>
  );
}
