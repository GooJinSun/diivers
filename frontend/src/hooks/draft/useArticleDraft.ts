import { ArticleDraft } from '@models/posts';
import useDraft from './useDraft';

const ARTICLE_DRAFT_LIST_KEY = 'article_draft_list';

const useArticleDraft = () => {
  const { draftList, saveDraft, updateDraft, deleteDraft } =
    useDraft<ArticleDraft>(ARTICLE_DRAFT_LIST_KEY);

  return { draftList, saveDraft, updateDraft, deleteDraft };
};

export default useArticleDraft;
