import { useInfiniteQuery } from '@tanstack/react-query';
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
          return Number(nextUrl.split('?page=')[1]);
        }
        return false;
      }
    }
  );
};
