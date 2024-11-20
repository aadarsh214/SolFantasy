import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer } from 'lucide-react';
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";


interface Match {
  id: number;
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  time: string;
  timeRemaining: string;
  tournament: string;
}

interface MatchListProps {
  isLoading: boolean;
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

const MatchList: React.FC<MatchListProps> = ({ isLoading, matches, onSelectMatch }) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white border-gray-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                <div className="flex justify-between items-center">
                  <div className="text-white text-sm font-medium">{match.tournament}</div>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    {match.time}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={match.team1.logo} alt={match.team1.name} />
                      <AvatarFallback>{match.team1.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">{match.team1.name}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">vs</div>
                  <div className="flex items-center gap-3">
                    <div className="font-semibold">{match.team2.name}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={match.team2.logo} alt={match.team2.name} />
                      <AvatarFallback>{match.team2.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                  <Timer className="h-4 w-4" />
                  {match.timeRemaining}
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  onClick={() => onSelectMatch(match)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MatchList;