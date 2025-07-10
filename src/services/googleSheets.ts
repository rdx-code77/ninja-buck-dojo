import { NinjaData, NinjaUser, Prize } from "@/types/ninja";

const GOOGLE_SHEETS_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgd01UFOHRqXtFYZHBLcL-FfJfid28fYi22CcDm19gd4KccJMmi5v4iNtAnqCaAj-Qoy0Sq-YcorWk5Lbo5Z_7sABUNkRJ9tz3EFW1zuZsx4MPW-5OPnQcIrkxYwgb_gTpLuKlA5W3ZvYhBrOMqxDUrnKb3MJrVHFeXrghyk0WVDJK97m-czG-aUR1KRIT912kGD7dcOncj6ghTTgWZavtvIIUPm9PIYioW8EACPs7SRQlGs6TdUCBnSg7tJMjbf9eW3-DZ8aMu4Y9k4RhC9SbabK8heg&lib=MVJToO7wUeDGVR-YK-AFn7vUpSJ62eWWl";

export const fetchNinjaData = async (): Promise<NinjaData> => {
  try {
    console.log("Fetching ninja data from:", GOOGLE_SHEETS_URL);
    const response = await fetch(GOOGLE_SHEETS_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Raw data received:", data);
    
    // Handle the actual data structure from your Google Sheets
    let users: NinjaUser[] = [];
    
    if (Array.isArray(data)) {
      // Data is directly an array of users
      users = data.map((user: any, index: number) => ({
        id: user.id || String(index + 1),
        name: user.name || "",
        ninjaBucks: Number(user.totalNinjaBucks || 0),
        rank: user.latestRank || "White Belt",
      }));
    } else if (data.users && Array.isArray(data.users)) {
      // Data has users property
      users = data.users.map((user: any, index: number) => ({
        id: user.id || String(index + 1),
        name: user.name || "",
        ninjaBucks: Number(user.totalNinjaBucks || user.ninjaBucks || 0),
        rank: user.latestRank || user.rank || "White Belt",
      }));
    }

    // Default prizes since they're not in your data
    const prizes: Prize[] = [
      {
        id: "1",
        name: "Ninja Stickers Pack",
        description: "Cool ninja-themed stickers for your laptop",
        cost: 50,
        category: "Accessories",
        inStock: true,
      },
      {
        id: "2",
        name: "Code Ninjas T-Shirt",
        description: "Official Code Ninjas t-shirt",
        cost: 100,
        category: "Clothing",
        inStock: true,
      },
      {
        id: "3",
        name: "Programming Book",
        description: "Learn advanced coding techniques",
        cost: 150,
        category: "Education",
        inStock: true,
      },
      {
        id: "4",
        name: "Gaming Mouse",
        description: "High-performance gaming mouse",
        cost: 200,
        category: "Tech",
        inStock: true,
      },
      {
        id: "5",
        name: "VIP Coding Session",
        description: "One-on-one mentoring session",
        cost: 400,
        category: "Experience",
        inStock: true,
      },
    ];

    console.log("Processed users:", users);
    return { users, prizes };
  } catch (error) {
    console.error("Error fetching ninja data:", error);
    
    // Return empty data on error
    return {
      users: [],
      prizes: []
    };
  }
};