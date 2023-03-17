import { useInfiniteQuery } from 'react-query';
import { getFriendPosts } from '../../modules/post/_index';
import getQueryKey from '../getQueryKey';

export const useInfiniteFriendPostList = () => {
  return useInfiniteQuery(
    getQueryKey('GET_FRIEND_POST_LIST'),
    ({ pageParam = 0 }) => getFriendPosts(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextUrl = lastPage.next;
        if (nextUrl) {
          // Return next page number
          return Number(nextUrl.charAt(nextUrl.length - 1));
        }
        // Return false means no next page
        return false;
      }
    }
  );
};
