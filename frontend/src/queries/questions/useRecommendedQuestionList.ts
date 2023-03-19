import { useQuery } from '@tanstack/react-query';
import { getRecommendedQuestions } from '../../modules/question/_index';
import getQueryKey from '../getQueryKey';

export const useRecommendedQuestionList = () => {
  return useQuery(
    getQueryKey('GET_RECOMMENDED_QUESTIONS'),
    getRecommendedQuestions,
    {
      select: (res) => res.results
    }
  );
};
