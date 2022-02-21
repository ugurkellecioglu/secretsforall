import { createContext, Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
interface PostContextProps {
  handleReply: (text: string) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  comments: Array<Object>;
  setComments: Dispatch<SetStateAction<Array<Object>>>;
  isReply: boolean;
  setIsReply: Dispatch<SetStateAction<boolean>>;
}

interface PostProviderProps {
  children: React.ReactNode;
}

const PostContext = createContext({} as PostContextProps);

export const PostProvider = ({ children }: PostProviderProps) => {
  const handleReply = async () => console.log('we are replying now');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isReply, setIsReply] = useState(false);
  return (
    <PostContext.Provider
      value={{ handleReply, comment, setComment, comments, setComments, isReply, setIsReply }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
