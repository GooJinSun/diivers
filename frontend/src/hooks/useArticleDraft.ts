import useLocalStorage from '@hooks/common/useLocalStorage';
import { ArticleDraft } from '@models/posts';
import { useCallback } from 'react';
import useDepsFree from './common/useDepsFree';

const DRAFT_LIST = 'article_draft_list';

interface ArticleDraftStoredItem extends ArticleDraft {
  id: number;
}

const useArticleDraft = () => {
  const [list, setList] = useLocalStorage<ArticleDraftStoredItem[]>(
    DRAFT_LIST,
    []
  );

  const listRef = useDepsFree(list);

  const saveDraft = useCallback(
    (article: ArticleDraft) => {
      const timeStamp = new Date().getTime();
      setList([...listRef.current, { ...article, id: timeStamp }]);
    },
    [listRef, setList]
  );

  return { draftList: list, saveDraft };
};

export default useArticleDraft;
