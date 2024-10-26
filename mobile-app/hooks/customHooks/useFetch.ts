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

interface FetchOptions {
  url: string;
  fromDate?: string;
  toDate?: string;
  delay?: number;
}

const useFetch = ({ url, fromDate, toDate, delay = 500 }: FetchOptions) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          // Determine storage key based on the URL
          const storageKey = url.includes("apple")
            ? "Appleheadlines"
            : "Teslaheadlines";

          const finalUrl = `${url}&from=${fromDate || ""}${
            toDate ? `&to=${toDate}` : ""
          }`;
          const response = await fetch(finalUrl, {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, */*",
            },
          });

          if (!response.ok) {
            throw new Error("Error fetching data");
          }

          const result: ApiResponse = await response.json();

          // Store the result in AsyncStorage with the determined key
          await AsyncStorage.setItem(
            storageKey,
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
  }, [url, fromDate, toDate, delay]);

  return { data, loading, error };
};

export default useFetch;
