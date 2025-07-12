import { useState } from "react";
import { Search, Trophy, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NinjaScoreboard } from "./NinjaScoreboard";
import { NinjaGrindGuide } from "./NinjaGrindGuide";
import { NinjaAnalytics } from "./NinjaAnalytics";
import { NinjaData } from "@/types/ninja";
import codeNinjasLogo from "@/assets/code-ninjas-logo.png";

interface NinjaLoginProps {
  onLogin: (name: string) => void;
  data: NinjaData;
}

export const NinjaLogin = ({ onLogin, data }: NinjaLoginProps) => {
  const [name, setName] = useState("");
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showGrindGuide, setShowGrindGuide] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Friendly floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-friendly rounded-full opacity-20 animate-gentle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Dashboard Button - Left Side */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="friendly" 
          size="sm"
          onClick={() => setShowAnalytics(true)}
          className="backdrop-blur-sm"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics Hub
        </Button>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button 
          variant="purple" 
          size="sm"
          onClick={() => setShowScoreboard(true)}
          className="backdrop-blur-sm"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Leaderboard
        </Button>
        <Button 
          variant="blue" 
          size="sm"
          onClick={() => setShowGrindGuide(true)}
          className="backdrop-blur-sm"
        >
          <Zap className="h-4 w-4 mr-2" />
          Training
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src={codeNinjasLogo} 
                alt="Code Ninjas" 
                className="h-32 w-auto animate-gentle-float transition-all duration-300"
                style={{filter: 'drop-shadow(0 5px 15px hsl(var(--ninja-purple) / 0.4))'}}
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-primary animate-fade-in-scale" 
                  style={{textShadow: '0 0 20px hsl(var(--ninja-purple) / 0.6)'}}>
                Ninja Academy
              </h1>
              <p className="text-muted-foreground text-lg animate-slide-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                Welcome to your coding journey! Let's check your progress
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="bg-gradient-card border-primary/30 shadow-ninja backdrop-blur-sm animate-fade-in-scale" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground animate-slide-up" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>Enter Your Name</CardTitle>
              <CardDescription className="text-muted-foreground animate-slide-up" style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
                Ready to see your ninja progress? Type your name below!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative animate-slide-up" style={{animationDelay: '0.9s', animationFillMode: 'both'}}>
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-ninja transition-all duration-300 hover:border-primary/50"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="ninja" 
                  className="w-full"
                  disabled={!name.trim()}
                >
                  Let's Go, Ninja! 🥷
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Powered by Code Ninjas Academy ✨
            </p>
          </div>
        </div>
      </div>

      <NinjaScoreboard 
        users={data.users}
        open={showScoreboard}
        onOpenChange={setShowScoreboard}
      />
      
      <NinjaGrindGuide 
        open={showGrindGuide}
        onOpenChange={setShowGrindGuide}
      />
      
      {showAnalytics && (
        <NinjaAnalytics 
          users={data.users}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
};