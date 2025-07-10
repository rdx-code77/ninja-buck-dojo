import { NinjaData, NinjaUser, Prize } from "@/types/ninja";

const GOOGLE_SHEETS_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgd01UFOHRqXtFYZHBLcL-FfJfid28fYi22CcDm19gd4KccJMmi5v4iNtAnqCaAj-Qoy0Sq-YcorWk5Lbo5Z_7sABUNkRJ9tz3EFW1zuZsx4MPW-5OPnQcIrkxYwgb_gTpLuKlA5W3ZvYhBrOMqxDUrnKb3MJrVHFeXrghyk0WVDJK97m-czG-aUR1KRIT912kGD7dcOncj6ghTTgWZavtvIIUPm9PIYioW8EACPs7SRQlGs6TdUCBnSg7tJMjbf9eW3-DZ8aMu4Y9k4RhC9SbabK8heg&lib=MVJToO7wUeDGVR-YK-AFn7vUpSJ62eWWl";

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