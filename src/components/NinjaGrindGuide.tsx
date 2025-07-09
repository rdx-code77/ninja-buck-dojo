import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Zap, Code, Trophy, Users, Target, BookOpen } from "lucide-react";

interface NinjaGrindGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const grindMethods = [
  {
    icon: Code,
    title: "Complete Coding Challenges",
    description: "Finish your coding projects and exercises",
    reward: "5-15 Ninja Bucks",
    color: "text-ninja-purple"
  },
  {
    icon: Target,
    title: "Master New Skills",
    description: "Learn new programming languages or technologies",
    reward: "10-20 Ninja Bucks",
    color: "text-ninja-gold"
  },
  {
    icon: Users,
    title: "Help Fellow Ninjas",
    description: "Assist classmates with their coding problems",
    reward: "3-8 Ninja Bucks",
    color: "text-accent"
  },
  {
    icon: Trophy,
    title: "Win Coding Competitions",
    description: "Participate and excel in coding contests",
    reward: "15-30 Ninja Bucks",
    color: "text-ninja-gold"
  },
  {
    icon: BookOpen,
    title: "Complete Learning Modules",
    description: "Finish assigned lessons and tutorials",
    reward: "5-12 Ninja Bucks",
    color: "text-ninja-purple"
  },
  {
    icon: Zap,
    title: "Bonus Challenges",
    description: "Take on extra credit assignments",
    reward: "8-25 Ninja Bucks",
    color: "text-accent"
  }
];

export const NinjaGrindGuide = ({ open, onOpenChange }: NinjaGrindGuideProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-card border-border shadow-elevated max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-ninja bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="h-6 w-6 text-ninja-gold" />
            Ninja Grind Guide
          </DialogTitle>
          <DialogDescription>
            Master these activities to earn more Ninja Bucks and level up your skills!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {grindMethods.map((method, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-muted/50 ${method.color}`}>
                  <method.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <Badge variant="secondary" className="text-xs bg-ninja-gold/20 text-ninja-gold border-ninja-gold/30">
                    {method.reward}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-ninja/10 border border-ninja-purple/30 rounded-lg p-4 mt-4">
          <h3 className="font-semibold text-ninja-purple mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Pro Ninja Tip
          </h3>
          <p className="text-sm text-muted-foreground">
            The more you practice and help others, the faster you'll earn Ninja Bucks! 
            Consistency is key - even small daily efforts add up to big rewards.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};