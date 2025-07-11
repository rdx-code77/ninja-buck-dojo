import { Coins, Star, Trophy, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NinjaUser, Prize } from "@/types/ninja";

interface NinjaDashboardProps {
  user: NinjaUser;
  prizes: Prize[];
  onLogout: () => void;
}

export const NinjaDashboard = ({ user, prizes, onLogout }: NinjaDashboardProps) => {
  const canAfford = (prize: Prize) => user.ninjaBucks >= prize.cost;

  const categories = Array.from(new Set(prizes.map(p => p.category)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-card border-b border-border shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, <span className="bg-gradient-ninja bg-clip-text text-transparent">{user.name}</span>!
              </h1>
              {user.rank && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  {user.rank}
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Balance Card */}
        <Card className="bg-gradient-card border-border shadow-ninja animate-bounce-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2 animate-ninja-stealth" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
              <Coins className="w-8 h-8 text-ninja-gold animate-coin-spin hover:animate-ninja-glow" style={{filter: 'drop-shadow(0 0 8px hsl(var(--ninja-gold) / 0.6))'}} />
              Your Ninja Bucks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-2 animate-ninja-shuriken-spin" 
                 style={{animationDelay: '0.4s', animationFillMode: 'both', filter: 'drop-shadow(0 0 10px hsl(var(--ninja-gold) / 0.8))'}}>
              {user.ninjaBucks}
            </div>
            <p className="text-muted-foreground animate-fade-in-scale" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>Keep coding to earn more!</p>
          </CardContent>
        </Card>

        {/* Prizes Section */}
        <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary animate-wiggle" />
            <h2 className="text-2xl font-bold text-foreground">Ninja Store</h2>
          </div>

          {categories.map(category => {
            const categoryPrizes = prizes.filter(p => p.category === category);
            
            return (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryPrizes.map(prize => {
                    const affordable = canAfford(prize);
                    
                    return (
                      <Card 
                        key={prize.id} 
                        className={`transition-all duration-300 ${
                          affordable 
                            ? 'bg-gradient-card border-border hover:shadow-gold hover:scale-105 cursor-pointer' 
                            : 'bg-muted border-border opacity-60'
                        }`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className={`text-lg ${affordable ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {prize.name}
                            </CardTitle>
                            <Badge 
                              variant={affordable ? "default" : "secondary"}
                              className={affordable ? "bg-ninja-gold text-ninja-dark" : ""}
                            >
                              <Coins className="w-3 h-3 mr-1" />
                              {prize.cost}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className={affordable ? 'text-muted-foreground' : 'text-muted-foreground/60'}>
                            {prize.description}
                          </CardDescription>
                          <div className="mt-4">
                            <Button 
                              variant={affordable ? "gold" : "disabled"}
                              size="sm"
                              className="w-full"
                              disabled={!affordable}
                            >
                              {affordable ? 'Redeem Prize' : 'Need More Bucks'}
                            </Button>
                          </div>
                          {!affordable && (
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                              Need {prize.cost - user.ninjaBucks} more bucks
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivation Section */}
        <Card className="bg-gradient-ninja border-border text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Keep Learning!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90">
              Complete coding challenges, help classmates, and participate in activities to earn more Ninja Bucks!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};