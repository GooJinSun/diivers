import axios from '../../utils/api';

type GetRecommmendedQuestionsResponse = {
  results: string[];
};

export const getRecommendedQuestions =
  async (): Promise<GetRecommmendedQuestionsResponse> => {
    let data: GetRecommmendedQuestionsResponse = {
      results: []
    };
    try {
      const res = await axios.get(`/feed/questions/daily/recommended/`);
      data = res.data;
    } catch (error) {
      throw Error;
    }
    return data;
  };
