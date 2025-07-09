import { NinjaUser } from "@/types/ninja";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface NinjaScoreboardProps {
  users: NinjaUser[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NinjaScoreboard = ({ users, open, onOpenChange }: NinjaScoreboardProps) => {
  const topUsers = users
    .sort((a, b) => b.ninjaBucks - a.ninjaBucks)
    .slice(0, 5);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-ninja-gold" />;
      case 1:
        return <Medal className="h-6 w-6 text-ninja-silver" />;
      case 2:
        return <Award className="h-6 w-6 text-accent" />;
      default:
        return <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{index + 1}</div>;
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-gold border-ninja-gold/30 shadow-gold";
      case 1:
        return "bg-gradient-to-r from-ninja-silver/20 to-ninja-silver/10 border-ninja-silver/30";
      case 2:
        return "bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border-border shadow-elevated max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-ninja bg-clip-text text-transparent flex items-center gap-2">
            <Trophy className="h-6 w-6 text-ninja-gold" />
            Ninja Leaderboard
          </DialogTitle>
          <DialogDescription>
            Top 5 ninjas with the most Ninja Bucks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${getRankStyle(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getRankIcon(index)}
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    {user.rank && (
                      <Badge variant="secondary" className="text-xs">
                        {user.rank}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-ninja-gold">
                    {user.ninjaBucks}
                  </div>
                  <div className="text-xs text-muted-foreground">Ninja Bucks</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Keep training to climb the leaderboard! 🥷
        </div>
      </DialogContent>
    </Dialog>
  );
};