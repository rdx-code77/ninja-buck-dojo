import { useState, useEffect } from "react";
import { NinjaData } from "@/types/ninja";
import { fetchNinjaData } from "@/services/googleSheets";

export const useNinjaData = () => {
  const [data, setData] = useState<NinjaData>({ users: [], prizes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedData = await fetchNinjaData();
        setData(fetchedData);
      } catch (err) {
        console.error("Failed to load ninja data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedData = await fetchNinjaData();
      setData(fetchedData);
    } catch (err) {
      console.error("Failed to refresh ninja data:", err);
      setError("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refreshData };
};