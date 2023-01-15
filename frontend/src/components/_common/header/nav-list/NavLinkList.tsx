import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from './NavLinkList.styles';

const NavLinkList = () => {
  const classes = useStyles();

  return (
    <>
      <NavLink
        className={classes.tabButton}
        to="/home"
        activeClassName={classes.tabActive}
      >
        Home
      </NavLink>
      <NavLink
        className={classes.tabButton}
        to="/anonymous"
        activeClassName={classes.tabActive}
      >
        익명 글
      </NavLink>
      <NavLink
        className={classes.tabButton}
        to="/questions"
        activeClassName={classes.tabActive}
      >
        오늘의 질문
      </NavLink>
    </>
  );
};

export default NavLinkList;
