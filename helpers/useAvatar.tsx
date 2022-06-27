import { useCallback, useState } from 'react';

const generateSeed = (): string => (Math.random() + 1).toString(36).substring(7);

const useAvatar = () => {
  const [url, setUrl] = useState(
    `https://avatars.dicebear.com/api/avataaars/${generateSeed()}.svg`
  );

  const toggle = useCallback(
    () => setUrl(() => `https://avatars.dicebear.com/api/avataaars/${generateSeed()}.svg`),
    []
  );
  return [url, toggle] as const;
};

export default useAvatar;
