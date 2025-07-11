import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { NinjaLogin } from "./NinjaLogin";
import { NinjaDashboard } from "./NinjaDashboard";
import { useNinjaData } from "@/hooks/useNinjaData";
import { NinjaUser } from "@/types/ninja";

export const NinjaBucksApp = () => {
  const [currentUser, setCurrentUser] = useState<NinjaUser | null>(null);
  const { toast } = useToast();
  const { data, loading, error } = useNinjaData();

  const handleLogin = (name: string) => {
    // Find user by name (case-insensitive)
    const user = data.users.find(
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ninja-gold mx-auto"></div>
          <p className="text-muted-foreground">Loading Ninja Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error loading data: {error}</p>
          <p className="text-muted-foreground">Using backup data</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return (
      <NinjaDashboard 
        user={currentUser} 
        prizes={data.prizes}
        onLogout={handleLogout}
      />
    );
  }

  return <NinjaLogin onLogin={handleLogin} data={data} />;
};