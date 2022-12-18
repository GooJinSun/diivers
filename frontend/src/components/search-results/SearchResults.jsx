import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FriendItem from '@common-components/friend-item/FriendItem';
import Message from '@common-components/message/Message';
import { fetchSearchResults } from '@modules/search';
import PageNavigation from './page-navigation/PageNavigation';
import { FriendListWrapper } from './SearchResults.styles';

export default function SearchResults() {
  const dispatch = useDispatch();
  const searchObj = useSelector((state) => state.searchReducer.searchObj);

  const showPrevLink = searchObj.currentPageNo > 1;
  const showNextLink = searchObj.totalPages > searchObj.currentPageNo;

  const handlePageClick = (type, event) => {
    event.preventDefault();
    const updatePageNo =
      type === 'prev'
        ? searchObj.currentPageNo - 1
        : searchObj.currentPageNo + 1;

    if (!searchObj.loading) {
      dispatch(fetchSearchResults(updatePageNo, searchObj.query));
    }
  };

  const renderSearchResults = () => {
    const userItemList = searchObj.results?.map((user) => {
      return (
        <FriendItem
          key={user.id}
          friendObj={user}
          isFriend={user.are_friends}
          isPending={user.received_friend_request_from}
          hasSentRequest={user.sent_friend_request_to}
          showFriendStatus
        />
      );
    });

    if (Object.keys(searchObj.results).length && searchObj.results.length) {
      return (
        <span>
          {searchObj.searchError ? (
            searchObj.message && <p className="message">{searchObj.message}</p>
          ) : (
            <FriendListWrapper>
              <h3>
                친구 목록
                {`(${searchObj.numResults})`}
              </h3>
              {/* {searchObj.loading && searchObj.numResults > 0 ? ( */}
              {/*  <LinearProgress /> */}
              {/* ) : ( */}
              {/*  <span /> */}
              {/* )} */}
              {userItemList}
            </FriendListWrapper>
          )}
        </span>
      );
    }
    return <Message message="검색 결과 없음" />;
  };

  return (
    <span>
      {renderSearchResults()}

      <PageNavigation
        totalPages={searchObj.totalPages}
        currentPageNo={searchObj.currentPageNo}
        showPrevLink={showPrevLink}
        showNextLink={showNextLink}
        handlePrevClick={(event) => handlePageClick('prev', event)}
        handleNextClick={(event) => handlePageClick('next', event)}
      />
    </span>
  );
}
