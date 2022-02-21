import { createContext } from 'react';
import React from 'react';

interface ProfileProviderProps {
  children: React.ReactNode;
}

const ProfileContext = createContext({} as ProfileProviderProps);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  return <ProfileContext.Provider value={null}>{children}</ProfileContext.Provider>;
};

export default ProfileContext;
