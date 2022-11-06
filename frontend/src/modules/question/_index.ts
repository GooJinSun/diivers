import axios from '../../utils/api';

export const getRecommendedQuestions = async () => {
  let res = {
    data: {
      results: []
    }
  };
  try {
    res = await axios.get(`feed/questions/daily/recommended/`);
  } catch (error) {
    throw Error;
  }
  const { data } = res;

  return data.results;
};
