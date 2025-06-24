import { useEffect, useState } from 'react';

const useCommandSymbol = () => {
  const [symbol, setSymbol] = useState<'⌘' | 'Ctrl'>('Ctrl');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = navigator.userAgent.includes('Macintosh');

      setSymbol(isMac ? '⌘' : 'Ctrl');
    }
  }, []);

  return symbol;
};

export default useCommandSymbol;
