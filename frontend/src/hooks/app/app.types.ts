export interface SetTokenData {
  key: 'SET_TOKEN';
  access: string;
  refresh: string;
}

export interface RedirectData {
  key: 'REDIRECT';
  url: string;
}

export type PostMessageDataType = SetTokenData | RedirectData;
export type PostMessageKeyType = 'SET_TOKEN' | 'REDIRECT';
