export type Post = Article | Response | Question;

export enum POST_TYPE {
  ARTICLE = 'Article',
  RESPONSE = 'Response',
  QUESTION = 'Question'
}

export interface ShareSettings {
  share_with_friends: boolean;
  share_anonymously: boolean;
}

interface ArticleShareSettings extends ShareSettings {
  share_with_friends: true;
}

export interface Article extends ArticleShareSettings {
  type: POST_TYPE.ARTICLE;
  content: string;
}

export interface Response extends ShareSettings {
  type: POST_TYPE.RESPONSE;
  question_id: 1;
  question: Question;
  content: string;
}

interface QuestionShareSettings extends ShareSettings {
  share_with_friends: true;
  share_anonymously: true;
}

export interface Question extends QuestionShareSettings {
  type: POST_TYPE.QUESTION;
  id: number;
  content: string;
  like_count: number | null;
  current_user_liked: boolean;
  created_at: string;
  selected_date: string;
  is_admin_question: boolean;
  author: string | null;
  author_detail: Author;
}

export interface CustomQuestion {}

export interface Author {
  id: number;
  profile_image: null;
  profile_pic: string;
  url: string;
  username: string;
}
