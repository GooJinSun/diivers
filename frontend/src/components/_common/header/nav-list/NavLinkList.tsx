import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStyles } from './NavLinkList.styles';

const NavLinkList = () => {
  const [t] = useTranslation('translation', { keyPrefix: 'header' });

  const classes = useStyles();

  return (
    <>
      <NavLink
        className={classes.tabButton}
        to="/home"
        activeClassName={classes.tabActive}
      >
        {t('home')}
      </NavLink>
      <NavLink
        className={classes.tabButton}
        to="/anonymous"
        activeClassName={classes.tabActive}
      >
        {t('anonymous_feed')}
      </NavLink>
      <NavLink
        className={classes.tabButton}
        to="/questions"
        activeClassName={classes.tabActive}
      >
        {t('today_question')}
      </NavLink>
    </>
  );
};

export default NavLinkList;
