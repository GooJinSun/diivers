import 'intersection-observer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { MuiThemeProvider, createTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import { GlobalStyle, MainWrapper, FeedWrapper } from './styles';
import Header from './components/Header';
import QuestionListWidget from './components/QuestionListWidget';
import FriendListWidget from './components/FriendListWidget';
import SignUp from './pages/SignUp';
import QuestionSelection from './pages/QuestionSelection';
import FriendFeed from './pages/FriendFeed';
import AnonymousFeed from './pages/AnonymousFeed';
import QuestionFeed from './pages/QuestionFeed';
import PrivateRoute from './components/PrivateRoute';
import QuestionDetail from './pages/QuestionDetail';
import PostDetail from './pages/PostDetail';
import FriendsPage from './pages/FriendsPage';
import SearchResults from './pages/SearchResults';
import NotificationPage from './pages/NotificationPage';
import PostEdit from './pages/PostEdit';
import UserPage from './pages/UserPage';
import { getNotifications } from './modules/notification';
import MobileQuestionPage from './pages/MobileQuestionPage';
import MobileSearchPage from './pages/MobileSearchPage';
import { initGA, trackPage } from './ga';
import useLoginWithToken from './hooks/auth/useLoginWithToken';
import useIsMobile from './hooks/env/useIsMobile';
import useLogOutIfRefreshTokenExpired from './hooks/auth/useLogOutIfRefreshTokenExpired';

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

  useLoginWithToken();
  useLogOutIfRefreshTokenExpired();

  const currentUser = useSelector((state) => state.userReducer.currentUser);

  const isMobile = useIsMobile();
  const isSelectQuestionPage = location.pathname === '/select-questions';
  const showWidget = !isMobile && !isSelectQuestionPage && currentUser;

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
      <Header isMobile={isMobile} />
      <MainWrapper isSelectQuestionPage={isSelectQuestionPage}>
        {showWidget && <QuestionListWidget />}
        <FeedWrapper
          style={{
            left: !currentUser ? '275px' : '',
            width: !currentUser ? '655px' : ''
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/select-questions"
              component={QuestionSelection}
            />
            <PrivateRoute exact path="/home" component={FriendFeed} />
            <PrivateRoute exact path="/anonymous" component={AnonymousFeed} />
            <PrivateRoute exact path="/questions" component={QuestionFeed} />
            <PrivateRoute exact path="/users/:id" component={UserPage} />
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
            <Redirect from="/my-page" to={`/users/${currentUser?.id}`} />
            <Redirect exact path="/" to="/home" />
          </Switch>
        </FeedWrapper>
        {showWidget && <FriendListWidget />}
      </MainWrapper>
    </MuiThemeProvider>
  );
};

export default App;
