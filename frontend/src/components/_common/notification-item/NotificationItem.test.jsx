import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { mockNotiArrays } from '../../../constants';
import NotificationItem from './NotificationItem';
import { mockStore } from '../../../mockStore';
import rootReducer from '../../../modules';
import history from '../../../utils/history';

describe('<NotificationItem/>', () => {
  const store = createStore(
    rootReducer,
    mockStore,
    composeWithDevTools(applyMiddleware(thunk))
  );

  const wrapper = mount(
    <Provider store={store}>
      <Router history={history}>
        <NotificationItem notiObj={mockNotiArrays[0]} isNotificationPage />
      </Router>
    </Provider>
  );

  it('should render without errors', () => {
    const component = wrapper.find('NotificationItem');
    expect(component).toHaveLength(1);
  });
});
