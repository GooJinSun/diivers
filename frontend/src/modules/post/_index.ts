import { GetFeedResponse } from '@models/feed';
import axios from '../../utils/api';

export const getFriendPosts = async (
  pageNumber: number
): Promise<GetFeedResponse> => {
  let data: GetFeedResponse = {
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
