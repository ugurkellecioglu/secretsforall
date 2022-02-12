import { createContext, Dispatch, SetStateAction } from 'react';

interface PostContextProps {
  handleReply: (text: string) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}
export const PostContext = createContext({} as PostContextProps);
