import useLocalStorage from '@hooks/common/useLocalStorage';

import { useCallback } from 'react';
import useDepsFree from '../common/useDepsFree';

interface StoredItem {
  id: number;
  updated_at: number;
}

const useDraft = <T>(key: string) => {
  const [list, setList] = useLocalStorage<(T & StoredItem)[]>(
    key,
    [] as (T & StoredItem)[]
  );

  const listRef = useDepsFree(list);

  const saveDraft = useCallback(
    (draft: T) => {
      const timeStamp = new Date().getTime();
      setList([
        ...listRef.current,
        { ...draft, id: timeStamp, updated_at: timeStamp }
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
      setList([...listRef.current.filter((item) => item.id !== id)]);
    },
    [listRef, setList]
  );

  return { draftList: list, saveDraft, updateDraft, deleteDraft };
};

export default useDraft;
