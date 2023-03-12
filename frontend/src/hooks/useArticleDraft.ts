import useLocalStorage from '@hooks/common/useLocalStorage';
import { ArticleDraft } from '@models/posts';
import { useCallback } from 'react';
import useDepsFree from './common/useDepsFree';

const DRAFT_LIST = 'article_draft_list';

interface ArticleDraftStoredItem extends ArticleDraft {
  id: number;
  updated_at: number;
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
      setList([
        ...listRef.current,
        { ...article, id: timeStamp, updated_at: timeStamp }
      ]);
    },
    [listRef, setList]
  );

  const updateDraft = useCallback(
    (id: number, content: string) => {
      const updated = new Date().getTime();
      const updatedItemIndex = listRef.current.findIndex(
        (item) => item.id === id
      );

      setList([
        ...listRef.current.slice(0, updatedItemIndex),
        { ...listRef.current[updatedItemIndex], content, updated_at: updated },
        ...listRef.current.slice(updatedItemIndex + 1)
      ]);
    },
    [listRef, setList]
  );

  const deleteDraft = useCallback(
    (id: number) => {
      console.log('delete!');
      setList([...listRef.current.filter((item) => item.id !== id)]);
    },
    [listRef, setList]
  );

  return { draftList: list, saveDraft, updateDraft, deleteDraft };
};

export default useArticleDraft;
