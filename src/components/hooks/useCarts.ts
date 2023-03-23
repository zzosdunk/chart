import { useState, useEffect, useCallback } from "react";

import { CartData } from "../Types/types";

const useFetchCartsData = (apiUrl: string) => {
  const [carts, setCarts] = useState<CartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        setError("Something went wrong, check is the API correct");
        throw new Error("Something went wrong on fetching!");
      }

      const data = await response.json();
      setCarts(data.carts);
    } catch (error) {
      setError("Something went wrong");
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
