import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import codeNinjasLogo from "@/assets/code-ninjas-logo.png";

interface NinjaLoginProps {
  onLogin: (name: string) => void;
}

export const NinjaLogin = ({ onLogin }: NinjaLoginProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={codeNinjasLogo} 
              alt="Code Ninjas" 
              className="h-32 w-auto animate-float"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-ninja bg-clip-text text-transparent">
              Ninja Bucks
            </h1>
            <p className="text-muted-foreground text-lg">
              Check your balance and see what you can earn!
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-gradient-card border-border shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Enter Your Name</CardTitle>
            <CardDescription className="text-muted-foreground">
              Type your name to access your Ninja Bucks account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                variant="ninja" 
                className="w-full"
                disabled={!name.trim()}
              >
                Access My Ninja Bucks
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Code Ninjas Academy
          </p>
        </div>
      </div>
    </div>
  );
};