import React, { createContext } from 'react';

const HeaderContext = createContext(null);

const HeaderProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => setCollapsed((prev) => !prev);

  return (
    <HeaderContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggle
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export { HeaderProvider, HeaderContext };
