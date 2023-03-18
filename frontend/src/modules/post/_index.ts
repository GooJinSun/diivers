import axios from '../../utils/api';

// TODO(지나) 나중에 PostType 실제 타입으로 대체
type PostType = {
  id: number;
  content: string;
  [key: string]: any;
};

type GetFriendPostsResponse = {
  count: number;
  next: string;
  results: PostType[];
};

export const getFriendPosts = async (
  pageNumber: number
): Promise<GetFriendPostsResponse> => {
  let data: GetFriendPostsResponse = {
    results: [],
    count: 0,
    next: ''
  };

  const suffix = pageNumber !== 0 ? `?page=${pageNumber}` : '';
  try {
    const res = await axios.get(`/feed/friend/${suffix}`);
    data = res.data;
  } catch (error) {
    throw Error;
  }
  return data;
};
