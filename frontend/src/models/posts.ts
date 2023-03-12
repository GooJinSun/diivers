export type Post = Article | Response;
export type PostDraft = ArticleDraft | ResponseDraft;
export enum POST_TYPE {
  ARTICLE = 'Article',
  RESPONSE = 'Response',
  QUESTION = 'Question'
}

export interface ArticleDraft extends ArticleShareSettings {
  type: POST_TYPE.ARTICLE;
  content: string;
}

export interface Article extends ArticleShareSettings, ContentsCommon {
  type: POST_TYPE.ARTICLE;
  comments: Comment[];
}

export interface ResponseDraft extends ShareSettings {
  type: POST_TYPE.RESPONSE;
  content: string;
  question_id: number;
}

export interface Response extends ShareSettings, ContentsCommon {
  type: POST_TYPE.RESPONSE;
  comment: Comment[];
  question: Question;
  question_id: number;
}

export interface QuestionDraft extends QuestionShareSettings {
  type: POST_TYPE.QUESTION;
}

export interface Question extends QuestionShareSettings, ContentsCommon {
  type: POST_TYPE.QUESTION;
  selected_date: string | null;
  is_admin_question: boolean;
}

export interface ContentsCommon {
  id: number;
  content: string;
  author: string | null;
  author_detail: Author | AdminAuthor;
  like_count: number | null;
  current_user_liked: boolean;
  created_at: string;
}

export interface ShareSettings {
  share_with_friends: boolean;
  share_anonymously: boolean;
}

interface ArticleShareSettings extends ShareSettings {
  share_with_friends: true;
}

interface QuestionShareSettings extends ShareSettings {
  share_with_friends: true;
  share_anonymously: true;
}

export interface Comment extends ContentsCommon {
  is_anonymous: boolean;
  is_private: boolean;
  is_reply: boolean;
  replies: Comment[];
  target_id: number;
  type: 'Comment';
}

export interface Author {
  id: number;
  profile_image: null;
  profile_pic: string;
  url: string;
  username: string;
}

export interface AdminAuthor {
  color_hex: string;
}
