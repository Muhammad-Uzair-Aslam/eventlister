import {useState, useEffect} from 'react';
const useLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return isLoading;
};

export default useLoading;
