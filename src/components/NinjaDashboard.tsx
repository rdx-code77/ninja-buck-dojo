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
      <header className="bg-gradient-card border-b border-primary/30 shadow-ninja">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-1">
               <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                 Welcome back, <span className="text-primary">{user.name}</span>!
               </h1>
              {user.rank && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  {user.rank}
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={onLogout} size="lg">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Balance Card */}
         <Card className="bg-gradient-card border-primary/30 shadow-ninja max-w-md mx-auto lg:max-w-2xl">
           <CardHeader className="text-center pb-6">
             <CardTitle className="text-3xl lg:text-4xl text-foreground flex items-center justify-center gap-3">
               <Coins className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
               Your Ninja Bucks
             </CardTitle>
          </CardHeader>
           <CardContent className="text-center pb-8">
             <div className="text-7xl lg:text-8xl font-bold text-primary mb-4" 
                  style={{textShadow: '0 0 20px hsl(var(--ninja-purple) / 0.8)'}}>
               {user.ninjaBucks}
             </div>
             <p className="text-muted-foreground text-lg lg:text-xl">Keep coding to earn more!</p>
          </CardContent>
        </Card>

        {/* Prizes Section */}
         <div className="space-y-8">
           <div className="flex items-center gap-3">
             <ShoppingBag className="w-8 h-8 text-primary" />
             <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Ninja Store</h2>
           </div>

          {categories.map(category => {
            const categoryPrizes = prizes.filter(p => p.category === category);
            
            return (
               <div key={category} className="space-y-6">
                 <h3 className="text-2xl font-semibold text-foreground border-b border-primary/30 pb-3">
                   {category}
                 </h3>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {categoryPrizes.map(prize => {
                    const affordable = canAfford(prize);
                    
                    return (
                      <Card 
                        key={prize.id} 
                        className={`transition-all duration-300 ${
                          affordable 
                            ? 'bg-gradient-card border-primary/30 hover:shadow-ninja hover:scale-105 cursor-pointer' 
                            : 'bg-muted border-border opacity-60'
                        }`}
                      >
                         <CardHeader className="pb-4">
                           <div className="flex justify-between items-start">
                             <CardTitle className={`text-xl ${affordable ? 'text-foreground' : 'text-muted-foreground'}`}>
                               {prize.name}
                            </CardTitle>
                            <Badge 
                              variant={affordable ? "default" : "secondary"}
                              className={affordable ? "bg-primary text-primary-foreground" : ""}
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
                           <div className="mt-6">
                             <Button 
                               variant={affordable ? "friendly" : "disabled"}
                               size="default"
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
         <Card className="bg-gradient-ninja border-primary/30 text-primary-foreground max-w-4xl mx-auto">
           <CardHeader className="pb-6">
             <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl">
               <Trophy className="w-8 h-8" />
               Keep Learning!
             </CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-primary-foreground/90 text-lg lg:text-xl">
               Complete coding challenges, help classmates, and participate in activities to earn more Ninja Bucks!
             </p>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};