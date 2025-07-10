import { useState, useEffect } from "react";
import { NinjaData } from "@/types/ninja";
import { fetchNinjaData } from "@/services/googleSheets";
import { mockNinjaData } from "@/data/mockData";

export const useNinjaData = () => {
  const [data, setData] = useState<NinjaData>(mockNinjaData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedData = await fetchNinjaData();
        
        // Use fetched data if available, otherwise fallback to mock data
        if (fetchedData.users.length > 0 || fetchedData.prizes.length > 0) {
          setData(fetchedData);
        } else {
          setData(mockNinjaData);
        }
      } catch (err) {
        console.error("Failed to load ninja data:", err);
        setError("Failed to load data");
        setData(mockNinjaData);
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
      
      if (fetchedData.users.length > 0 || fetchedData.prizes.length > 0) {
        setData(fetchedData);
      } else {
        setData(mockNinjaData);
      }
    } catch (err) {
      console.error("Failed to refresh ninja data:", err);
      setError("Failed to refresh data");
      setData(mockNinjaData);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refreshData };
};