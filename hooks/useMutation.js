// hooks/useMutation.js
import { useCallback, useState } from 'react';

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: null,
  });

  const mutate = useCallback(async ({ url = '', method = 'POST', payload = {} } = {}) => {
    setData({
      ...data,
      isLoading: true,
    });

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      setData({
        ...data,
        data: result,
        isLoading: false,
      });

      return {
        result,
      };
    } catch (error) {
      setData({
        ...data,
        isLoading: false,
        isError: error,
      });
      return {
        error,
      };
    }
  }, [data]);

  return { ...data, mutate };
};
