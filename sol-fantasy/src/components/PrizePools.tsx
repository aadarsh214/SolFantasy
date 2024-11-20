import React from 'react';
import { Trophy, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const prizePools = [
  { 
    id: 1, 
    title: "Mega Contest", 
    prizePool: "₹1 Crore", 
    entry: "₹300", 
    spotsLeft: 840240, 
    totalSpots: 1000000,
    progress: 16
  },
  { 
    id: 2, 
    title: "Pro League", 
    prizePool: "₹50 Lakh", 
    entry: "₹150", 
    spotsLeft: 24957, 
    totalSpots: 100000,
    progress: 75
  },
  { 
    id: 3, 
    title: "Beginners' Special", 
    prizePool: "₹10 Lakh", 
    entry: "₹45", 
    spotsLeft: 15000, 
    totalSpots: 50000,
    progress: 70
  },
];

interface PrizePoolsProps {
  onCreateTeam: () => void;
}

const PrizePools: React.FC<PrizePoolsProps> = ({ onCreateTeam }) => {
  return (
    <div className="space-y-4">
      {prizePools.map((pool) => (
        <Card key={pool.id} className="bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">{pool.title}</CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {pool.spotsLeft.toLocaleString()} left
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-500">Prize Pool</div>
                <div className="text-2xl font-bold">{pool.prizePool}</div>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                onClick={onCreateTeam}
              >
                ₹{pool.entry}
              </Button>
            </div>
            <Progress value={pool.progress} className="h-2 mb-2" />
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{pool.spotsLeft.toLocaleString()} spots left</span>
              <span>{pool.totalSpots.toLocaleString()} spots</span>
            </div>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1 mb-2 sm:mb-0">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>75% Winners</span>
              </div>
              <div className="flex items-center gap-1 mb-2 sm:mb-0">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Upto 11 Teams</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Guaranteed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PrizePools;