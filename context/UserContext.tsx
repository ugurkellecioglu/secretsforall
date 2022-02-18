import { createContext } from 'react';

export const UserContext = createContext({
  user: {} as any,
  setUser: (user) => {
    return { ...user };
  }
});
