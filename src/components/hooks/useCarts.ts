import { useState, useEffect, useCallback } from "react";

import { CartData } from "../Types/types";

const useFetchCartsData = (apiUrl: string) => {
  const [carts, setCarts] = useState<CartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Something went wrong on fetching!");
      }

      const data = await response.json();
      console.log(data.carts);
      setCarts(data.carts);
    } catch (error) {
      //setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { carts, isLoading, error };
};

export default useFetchCartsData;
