import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { NinjaLogin } from "./NinjaLogin";
import { NinjaDashboard } from "./NinjaDashboard";
import { mockNinjaData } from "@/data/mockData";
import { NinjaUser } from "@/types/ninja";

export const NinjaBucksApp = () => {
  const [currentUser, setCurrentUser] = useState<NinjaUser | null>(null);
  const { toast } = useToast();

  const handleLogin = (name: string) => {
    // Find user by name (case-insensitive)
    const user = mockNinjaData.users.find(
      u => u.name.toLowerCase().includes(name.toLowerCase()) || 
           name.toLowerCase().includes(u.name.toLowerCase())
    );

    if (user) {
      setCurrentUser(user);
      toast({
        title: "Welcome back, Ninja!",
        description: `You have ${user.ninjaBucks} Ninja Bucks to spend.`,
      });
    } else {
      toast({
        title: "Ninja not found",
        description: "Please check your name spelling or contact your sensei.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "See you later, Ninja!",
      description: "Keep practicing your coding skills.",
    });
  };

  if (currentUser) {
    return (
      <NinjaDashboard 
        user={currentUser} 
        prizes={mockNinjaData.prizes}
        onLogout={handleLogout}
      />
    );
  }

  return <NinjaLogin onLogin={handleLogin} />;
};