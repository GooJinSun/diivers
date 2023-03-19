import { GetFeedResponse } from '@models/feed';
import { Comment } from '@models/posts';
import { InfiniteData } from '@tanstack/react-query';
import getQueryKey from '../getQueryKey';
import queryClient from '../queryClient';

export const updatePostsOnCreateComment = (
  postKey: string,
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
        ({ item }) => postKey === `${item.type}-${item.id}`
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.map((item) => {
        if (postKey === `${item.type}-${item.id}`) {
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

export const updatePostsOnCreateReply = (
  postKey: string,
  targetCommentId: number,
  newReply: Comment
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
        ({ item }) => postKey === `${item.type}-${item.id}`
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.map((item) => {
        if (postKey === `${item.type}-${item.id}`) {
          return {
            ...item,
            comments: item.comments.map((comment) => {
              if (comment.id === targetCommentId) {
                return {
                  ...comment,
                  replies:
                    comment.replies.length > 0
                      ? [...comment.replies, newReply]
                      : [newReply]
                };
              }
              return comment;
            })
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

export const updatePostsOnDeleteComment = (
  postKey: string,
  commentId: number
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
        ({ item }) => postKey === `${item.type}-${item.id}`
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.map((item) => {
        if (postKey === `${item.type}-${item.id}`) {
          return {
            ...item,
            comments: item.comments.filter(
              (comment) => comment.id !== commentId
            )
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

export const updatePostsOnDeleteReply = (postKey: string, replyId: number) => {
  queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
    getQueryKey('GET_FRIEND_POST_LIST'),
    (data) => {
      if (!data) return;

      const flatPostListWithPageIndex = data.pages.flatMap(
        ({ results }, index) =>
          results.flatMap((item) => ({ item, pageIndex: index }))
      );

      const targetPostWithPageIndex = flatPostListWithPageIndex.find(
        ({ item }) => postKey === `${item.type}-${item.id}`
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.map((item) => {
        if (postKey === `${item.type}-${item.id}`) {
          return {
            ...item,
            comments: item.comments.map((comment) => {
              return {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== replyId)
              };
            })
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

export const updatePostsOnDeletePost = (postKey: string) => {
  queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
    getQueryKey('GET_FRIEND_POST_LIST'),
    (data) => {
      if (!data) return;

      const flatPostListWithPageIndex = data.pages.flatMap(
        ({ results }, index) =>
          results.flatMap((item) => ({ item, pageIndex: index }))
      );

      const targetPostWithPageIndex = flatPostListWithPageIndex.find(
        ({ item }) => postKey === `${item.type}-${item.id}`
      );

      if (!targetPostWithPageIndex) return data;
      const { pageIndex } = targetPostWithPageIndex;

      const updatedPageResults = data.pages[pageIndex].results.filter(
        (item) => postKey !== `${item.type}-${item.id}`
      );

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
