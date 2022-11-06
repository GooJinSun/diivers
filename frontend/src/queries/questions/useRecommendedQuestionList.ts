import { useQuery } from 'react-query';
import getQueryKey from '../getQueryKey';
import { getRecommendedQuestions } from '../../modules/question/_index';

export const useRecommendedQuestionList = () => {
  return useQuery(
    getQueryKey('GET_RECOMMENDED_QUESTIONS'),
    getRecommendedQuestions,
    {
      select: (res) => res || []
    }
  );
};
