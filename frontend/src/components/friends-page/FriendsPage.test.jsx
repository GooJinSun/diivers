import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../modules';
import history from '../../utils/history';
import { mockStore } from '../../mockStore';
import FriendsPage from './FriendsPage';
import 'jest-styled-components';

describe('Friends Page unit mount test', () => {
  const store = createStore(
    rootReducer,
    mockStore,
    composeWithDevTools(applyMiddleware(thunk))
  );

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <FriendsPage />
        </Router>
      </Provider>
    );

  it('Friends Page should mount', async () => {
    jest.mock('react-redux', () => ({
      useDispatch: () => jest.fn()
    }));

    const wrapper = getWrapper();
    const friendList = wrapper.find('FriendListWrapper');
    expect(friendList.length).toBe(1);
  });
});
