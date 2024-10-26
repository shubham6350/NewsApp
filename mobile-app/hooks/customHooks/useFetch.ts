import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  title: string;
  description: string;
  publishedAt: string;
  source: Source;
  url: string;
  urlToImage: string;
}

interface ApiResponse {
  articles: Article[];
}

const useFetch = (url: string, delay: number = 500) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Debouncing function
    const handler = setTimeout(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
            },
          });

          if (!response.ok) {
            throw new Error("Error fetching data");
          }

          const result: ApiResponse = await response.json();

          await AsyncStorage.setItem(
            "headlines",
            JSON.stringify(result.articles)
          );
          setData(result);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [url, delay]);

  return { data, loading, error };
};

export default useFetch;
