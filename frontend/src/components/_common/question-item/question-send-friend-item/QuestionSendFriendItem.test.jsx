/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import history from '../../../../utils/history';
import rootReducer from '../../../../modules';
import * as actionCreators from '../../../../modules/question';
import { mockQuestionFeed, mockFriendList } from '../../../../constants';
import QuestionSendFriendItem from './QuestionSendFriendItem';
import { mockStore } from '../mockStore';

describe('<QuestionSendFriendItem /> unit test', () => {
  const store = createStore(
    rootReducer,
    mockStore,
    composeWithDevTools(applyMiddleware(thunk))
  );

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <QuestionSendFriendItem
            id="sended"
            questionObj={mockQuestionFeed[0]}
            friendObj={mockFriendList[0]}
            isWidget={false}
            sended
          />
          <QuestionSendFriendItem
            id="not-yet-sended"
            questionObj={mockQuestionFeed[1]}
            friendObj={mockFriendList[1]}
            isWidget={false}
            sended={false}
          />
        </Router>
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.find('QuestionSendFriendItem').length).toBe(2);
  });

  it(`should dispatch deleteResponseRequest when click '보내기 취소'`, async () => {
    const deleteResponseRequest = jest
      .spyOn(actionCreators, 'deleteResponseRequest')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const sendedFriendItem = wrapper.find('#sended');
    const deleteButton = sendedFriendItem.find('button');
    await act(async () => {
      deleteButton.simulate('click');
    });

    expect(deleteResponseRequest).toHaveBeenCalled();
  });

  it(`should dispatch createResponseRequest when click '보내기'`, async () => {
    const createResponseRequest = jest
      .spyOn(actionCreators, 'createResponseRequest')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    const sendedFriendItem = wrapper.find('#not-yet-sended');
    const deleteButton = sendedFriendItem.find('button');
    await act(async () => {
      deleteButton.simulate('click');
    });

    expect(createResponseRequest).toHaveBeenCalled();
  });
});
