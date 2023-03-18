import { Article, POST_TYPE, Question, Response } from './posts';

export const isResponse = (item: unknown): item is Response =>
  (item as Response).type === POST_TYPE.RESPONSE;

export const isQuestion = (item: unknown): item is Question =>
  (item as Question).type === POST_TYPE.QUESTION;

export const isArticle = (item: unknown): item is Article =>
  (item as Article).type === POST_TYPE.ARTICLE;
