import { NinjaData, NinjaUser, Prize } from "@/types/ninja";

const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw-Y6TWtGmf4kbn-DQJlvb9uUk48CKkesxYMVwb9R0lFUfvcwkaOwNGf6Rj6YFHiimF/exec";

export const fetchNinjaData = async (): Promise<NinjaData> => {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the data to match our expected format
    const users: NinjaUser[] = data.users?.map((user: any) => ({
      id: user.id || String(Math.random()),
      name: user.name || user.Name || "",
      ninjaBucks: Number(user.ninjaBucks || user.NinjaBucks || user.ninja_bucks || 0),
      rank: user.rank || user.Rank || "White Belt",
    })) || [];

    const prizes: Prize[] = data.prizes?.map((prize: any) => ({
      id: prize.id || String(Math.random()),
      name: prize.name || prize.Name || "",
      description: prize.description || prize.Description || "",
      cost: Number(prize.cost || prize.Cost || 0),
      category: prize.category || prize.Category || "General",
      inStock: prize.inStock !== false,
    })) || [];

    return { users, prizes };
  } catch (error) {
    console.error("Error fetching ninja data:", error);
    
    // Fallback to basic structure if fetch fails
    return {
      users: [],
      prizes: []
    };
  }
};