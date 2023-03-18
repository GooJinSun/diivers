import { GetFeedResponse } from '@models/feed';
import { Comment, Post } from '@models/posts';
import { InfiniteData, QueryClient } from '@tanstack/react-query';
import getQueryKey from '../getQueryKey';

export const updateComment = (
  queryClient: QueryClient,
  postObj: Post,
  newComment: Comment
) => {
  queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
    getQueryKey('GET_FRIEND_POST_LIST'),
    (data) => {
      if (!data) return;

      const flatPostListWithPageIndex = data.pages.flatMap(
        ({ results }, index) =>
          results.flatMap((item) => ({ item, pageIndex: index }))
      );

      const targetPostWithPageIndex = flatPostListWithPageIndex.find(
        ({ item }) => item.id === postObj?.id && item.type === postObj?.type
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.map((item) => {
        if (item.id === postObj.id && item.type === postObj.type) {
          return {
            ...item,
            comments:
              item.comments.length > 0
                ? [...item.comments, newComment]
                : [newComment]
          };
        }
        return item;
      });

      return {
        ...data,
        pages: data.pages.map((page, index) => {
          if (index === pageIndex) {
            return { ...page, results: updatedPageResults };
          }

          return page;
        })
      };
    }
  );
};
