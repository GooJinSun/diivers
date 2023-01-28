import 'intersection-observer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { MuiThemeProvider, createTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AccountActivate from '@components/account-activate/AccountActivate';
import AnonymousFeed from '@components/anonymous-feed/AnonymousFeed';
import FriendFeed from '@components/friend-feed/FriendFeed';
import FriendsPage from '@components/friends-page/FriendsPage';
import Login from '@components/login/Login';
import LostPassword from '@components/lost-password/LostPassword';
import MobileSearchPage from '@components/_mobile/mobile-search-page/MobileSearchPage';
import MobileQuestionPage from '@components/_mobile/mobile-question-page/MobileQuestionPage';
import NotificationPage from '@components/notification-page/NotificationPage';
import PostDetail from '@components/post-detail/PostDetail';
import PostEdit from '@components/post-edit/PostEdit';
import ResetPassword from '@components/reset-password/ResetPassword';
import SignUp from '@components/sign-up/SignUp';
import QuestionSelection from '@components/question-selection/QuestionSelection';
import QuestionFeed from '@components/question-feed/QuestionFeed';
import QuestionDetail from '@components/question-detail/QuestionDetail';
import SearchResults from '@components/search-results/SearchResults';
import UserPage from '@components/user-page/UserPage';
import { getNotifications } from '@modules/notification';
import Header from '@common-components/header/Header';
import QuestionListWidget from '@common-components/question-list-widget/QuestionListWidget';
import FriendListWidget from '@common-components/friend-list-widget/FriendListWidget';
import PrivateRoute from '@common-components/private-route/PrivateRoute';
import useLoginWithToken from '@hooks/auth/useLoginWithToken';
import useLogOutIfRefreshTokenExpired from '@hooks/auth/useLogOutIfRefreshTokenExpired';
import GlobalStyle from '@styles/globalStyle';
import { MainWrapper, FeedWrapper } from '@styles/wrappers';
import useAppLogin from '@hooks/auth/useAppLogin';
import useWindowWidth from '@hooks/env/useWindowWidth';
import { initGA, trackPage } from './ga';
import useFcm from './hooks/useFcm';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

const theme = createTheme({
  palette: {
    primary: { main: '#ff395b' },
    secondary: { light: '#eee', main: '#777' }
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif']
  }
});

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useAppLogin();
  useLoginWithToken();
  useLogOutIfRefreshTokenExpired();

  useFcm();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const { isDesktopMin } = useWindowWidth();

  const isSelectQuestionPage = location.pathname === '/select-questions';
  const showWidget = !isDesktopMin && !isSelectQuestionPage && currentUser;

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(getNotifications());
    }
    window.scrollTo(0, 0);
    trackPage(location.pathname);
  }, [location, dispatch, currentUser]);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <MainWrapper isSelectQuestionPage={isSelectQuestionPage}>
        {showWidget && <QuestionListWidget />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/activate/:id/:token"
            component={AccountActivate}
          />
          <Route exact path="/lost-password" component={LostPassword} />
          <Route
            exact
            path="/reset-password/:id/:token"
            component={ResetPassword}
          />
          <Route exact path="/select-questions" component={QuestionSelection} />
          <FeedWrapper>
            <PrivateRoute exact path="/home" component={FriendFeed} />
            <PrivateRoute exact path="/anonymous" component={AnonymousFeed} />
            <PrivateRoute exact path="/questions" component={QuestionFeed} />
            <PrivateRoute exact path="/users/:username" component={UserPage} />
            <PrivateRoute
              exact
              path="/notifications"
              component={NotificationPage}
            />
            <PrivateRoute
              exact
              path="/notifications/friend-request"
              component={NotificationPage}
              tabType="FriendRequest"
            />
            <PrivateRoute
              exact
              path="/notifications/response-request"
              component={NotificationPage}
              tabType="ResponseRequest"
            />
            <PrivateRoute
              exact
              path="/questions/:id"
              component={QuestionDetail}
            />
            <PrivateRoute
              exact
              path="/:postType/:id/edit"
              component={PostEdit}
            />
            <Route exact path="/search" component={SearchResults} />

            <PrivateRoute path="/:postType/:id" component={PostDetail} />
            <PrivateRoute exact path="/my-friends" component={FriendsPage} />
            <PrivateRoute
              exact
              path="/recommended-questions"
              component={MobileQuestionPage}
            />
            <PrivateRoute
              exact
              path="/user-search"
              component={MobileSearchPage}
            />
            <Redirect from="/my-page" to={`/users/${currentUser?.username}`} />
            <Redirect exact path="/" to="/home" />
          </FeedWrapper>
        </Switch>
        {showWidget && <FriendListWidget />}
      </MainWrapper>
    </MuiThemeProvider>
  );
};

export default App;
