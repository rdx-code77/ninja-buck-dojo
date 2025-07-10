import { NinjaData, NinjaUser, Prize } from "@/types/ninja";

const GOOGLE_SHEETS_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgd01UFOHRqXtFYZHBLcL-FfJfid28fYi22CcDm19gd4KccJMmi5v4iNtAnqCaAj-Qoy0Sq-YcorWk5Lbo5Z_7sABUNkRJ9tz3EFW1zuZsx4MPW-5OPnQcIrkxYwgb_gTpLuKlA5W3ZvYhBrOMqxDUrnKb3MJrVHFeXrghyk0WVDJK97m-czG-aUR1KRIT912kGD7dcOncj6ghTTgWZavtvIIUPm9PIYioW8EACPs7SRQlGs6TdUCBnSg7tJMjbf9eW3-DZ8aMu4Y9k4RhC9SbabK8heg&lib=MVJToO7wUeDGVR-YK-AFn7vUpSJ62eWWl";

// Temporary sample data based on your format while Google Sheets is being fixed
const sampleNinjaData = [
  {
    "name": "Emmett Daly",
    "totalNinjaBucks": 598,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Vishnu Mallya", 
    "totalNinjaBucks": 237,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Aiden Nunez",
    "totalNinjaBucks": 300,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Andrew Soucy",
    "totalNinjaBucks": 433,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Ailee Yim",
    "totalNinjaBucks": 345,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Conor Gibeau",
    "totalNinjaBucks": 469,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Jarrel Mays",
    "totalNinjaBucks": 530,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Vivian Tran",
    "totalNinjaBucks": 373,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Gregory Neto",
    "totalNinjaBucks": 374,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Carson Respess",
    "totalNinjaBucks": 481,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Yuvraaj Bheda",
    "totalNinjaBucks": 186,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Wyatt Nguyen",
    "totalNinjaBucks": 397,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Eddie Cazarreal",
    "totalNinjaBucks": 342,
    "latestRank": "Jr. Intermediate"
  },
  {
    "name": "Jaef Zhang",
    "totalNinjaBucks": 185,
    "latestRank": "Jr. Intermediate"
  }
];

const defaultPrizes: Prize[] = [
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
    name: "Arduino Starter Kit",
    description: "Build cool electronic projects",
    cost: 300,
    category: "Tech",
    inStock: true,
  },
  {
    id: "6",
    name: "VIP Coding Session",
    description: "One-on-one mentoring session",
    cost: 400,
    category: "Experience",
    inStock: true,
  },
];

export const fetchNinjaData = async (): Promise<NinjaData> => {
  try {
    console.log("Attempting to fetch from Google Sheets...");
    
    // Try to fetch from Google Sheets with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(GOOGLE_SHEETS_URL, {
      signal: controller.signal,
      mode: 'cors'
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Successfully fetched data from Google Sheets:", data);
    
    // Process the fetched data
    const users: NinjaUser[] = Array.isArray(data) 
      ? data.map((user: any, index: number) => ({
          id: String(index + 1),
          name: user.name || "",
          ninjaBucks: Number(user.totalNinjaBucks || 0),
          rank: user.latestRank?.trim() || "White Belt",
        }))
      : [];

    return { users, prizes: defaultPrizes };
    
  } catch (error) {
    console.warn("Failed to fetch from Google Sheets, using sample data:", error);
    
    // Fallback to sample data with your exact format
    const users: NinjaUser[] = sampleNinjaData.map((user, index) => ({
      id: String(index + 1),
      name: user.name,
      ninjaBucks: user.totalNinjaBucks,
      rank: user.latestRank.trim(),
    }));

    console.log("Using sample data:", users);
    return { users, prizes: defaultPrizes };
  }
};