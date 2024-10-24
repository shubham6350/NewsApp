import { useState, useEffect } from "react";

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

const useFetch = (url: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
