import { ResponseDraft } from '@models/posts';
import useDraft from './useDraft';

const RESPONSE_DRAFT_LIST_KEY = 'response_draft_list';

const useResponseDraft = () => {
  const { draftList, saveDraft, updateDraft, deleteDraft } =
    useDraft<ResponseDraft>(RESPONSE_DRAFT_LIST_KEY);

  return { draftList, saveDraft, updateDraft, deleteDraft };
};

export default useResponseDraft;
