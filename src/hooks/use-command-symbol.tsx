import { useEffect, useState } from 'react';

const useCommandSymbol = () => {
  const [symbol, setSymbol] = useState<'⌘' | 'Ctrl'>('⌘');

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = navigator.userAgent.includes('Mac'); // also works for iOS

      setSymbol(isMac ? '⌘' : 'Ctrl');
    }
  }, []);

  return symbol;
};

export default useCommandSymbol;
