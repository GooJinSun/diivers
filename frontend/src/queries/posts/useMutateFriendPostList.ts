import { GetFeedResponse } from '@models/feed';
import { Comment } from '@models/posts';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import getQueryKey from '../getQueryKey';

const findTargetPage = (
  data: InfiniteData<GetFeedResponse>,
  postKey: string
) => {
  if (!data) return;

  const flatPostListWithPageIndex = data.pages.flatMap(({ results }, index) =>
    results.flatMap((item) => ({ item, pageIndex: index }))
  );

  return flatPostListWithPageIndex.find(
    ({ item }) => postKey === `${item.type}-${item.id}`
  );
};

const useMutateFriendPostList = () => {
  const queryClient = useQueryClient();

  const mutateOnCreateComment = (postKey: string, newComment: Comment) => {
    queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
      getQueryKey('GET_FRIEND_POST_LIST'),
      (data) => {
        if (!data) return;

        const targetPageWithPageIndex = findTargetPage(data, postKey);

        if (!targetPageWithPageIndex) return data;
        const { pageIndex } = targetPageWithPageIndex;

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

  const mutateOnCreateReply = (
    postKey: string,
    targetCommentId: number,
    newReply: Comment
  ) => {
    queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
      getQueryKey('GET_FRIEND_POST_LIST'),
      (data) => {
        if (!data) return;

        const targetPageWithPageIndex = findTargetPage(data, postKey);

        if (!targetPageWithPageIndex) return data;
        const { pageIndex } = targetPageWithPageIndex;

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

  const mutateOnDeleteComment = (postKey: string, commentId: number) => {
    queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
      getQueryKey('GET_FRIEND_POST_LIST'),
      (data) => {
        if (!data) return;

        const targetPageWithPageIndex = findTargetPage(data, postKey);

        if (!targetPageWithPageIndex) return data;
        const { pageIndex } = targetPageWithPageIndex;

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

  const mutateOnDeleteReply = (postKey: string, replyId: number) => {
    queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
      getQueryKey('GET_FRIEND_POST_LIST'),
      (data) => {
        if (!data) return;

        const targetPageWithPageIndex = findTargetPage(data, postKey);

        if (!targetPageWithPageIndex) return data;
        const { pageIndex } = targetPageWithPageIndex;

        const updatedPageResults = data.pages[pageIndex].results.map((item) => {
          if (postKey === `${item.type}-${item.id}`) {
            return {
              ...item,
              comments: item.comments.map((comment) => {
                return {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply.id !== replyId
                  )
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

  const mutateOnDeletePost = (postKey: string) => {
    queryClient.setQueryData<InfiniteData<GetFeedResponse>>(
      getQueryKey('GET_FRIEND_POST_LIST'),
      (data) => {
        if (!data) return;

        const targetPageWithPageIndex = findTargetPage(data, postKey);

        if (!targetPageWithPageIndex) return data;
        const { pageIndex } = targetPageWithPageIndex;

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

  return {
    mutateOnCreateComment,
    mutateOnCreateReply,
    mutateOnDeleteComment,
    mutateOnDeleteReply,
    mutateOnDeletePost
  };
};

export default useMutateFriendPostList;
