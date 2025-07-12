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
      {/* Matrix Rain Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-2 bg-gradient-to-b from-primary via-primary to-transparent animate-matrix-rain opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Dashboard Button - Left Side */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="matrix" 
          size="sm"
          onClick={() => setShowAnalytics(true)}
          className="backdrop-blur-sm"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics Matrix
        </Button>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button 
          variant="stealth" 
          size="sm"
          onClick={() => setShowScoreboard(true)}
          className="backdrop-blur-sm"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Ninja Board
        </Button>
        <Button 
          variant="matrix" 
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
                className="h-32 w-auto animate-ninja-stealth hover:animate-pulse-glow transition-all duration-300"
                style={{filter: 'drop-shadow(0 5px 15px hsl(var(--ninja-matrix) / 0.6)) hue-rotate(120deg)'}}
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-matrix bg-clip-text text-transparent animate-ninja-shadow-drop" 
                  style={{textShadow: '0 0 20px hsl(var(--ninja-matrix) / 0.8)'}}>
                Ninja Matrix
              </h1>
              <p className="text-muted-foreground text-lg animate-slide-up font-mono" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                Enter the digital dojo • Access your training data
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="bg-gradient-card border-primary/30 shadow-matrix backdrop-blur-sm animate-fade-in-scale" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground animate-slide-up font-mono" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>NINJA AUTHENTICATION</CardTitle>
              <CardDescription className="text-muted-foreground animate-slide-up font-mono" style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
                {'>'} Identify yourself to access the matrix_
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative animate-slide-up" style={{animationDelay: '0.9s', animationFillMode: 'both'}}>
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter ninja identification..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:shadow-matrix transition-all duration-300 hover:border-primary/50 font-mono"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="ninja" 
                  className="w-full font-mono tracking-wider"
                  disabled={!name.trim()}
                >
                  ACCESS NINJA MATRIX
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-mono">
              {'>'} SYSTEM.POWERED_BY("Code Ninjas Matrix Academy");
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