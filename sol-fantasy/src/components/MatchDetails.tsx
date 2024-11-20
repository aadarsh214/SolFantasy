import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import PrizePools from './PrizePools';
import MyTeams from './MyTeams';

interface Match {
  id: number;
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  time: string;
  timeRemaining: string;
  tournament: string;
}

interface MatchDetailsProps {
  match: Match | null;
  onClose: () => void;
  onCreateTeam: () => void;
  teams: any[];
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, onClose, onCreateTeam, teams }) => {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    prizePools: useRef<HTMLDivElement>(null),
    myTeams: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: 'overview' | 'prizePools' | 'myTeams') => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  if (!match) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{match.team1.name} vs {match.team2.name}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between mb-4 border-b">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'ghost'}
            onClick={() => scrollToSection('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeSection === 'prizePools' ? 'default' : 'ghost'}
            onClick={() => scrollToSection('prizePools')}
          >
            Prize Pools
          </Button>
          <Button
            variant={activeSection === 'myTeams' ? 'default' : 'ghost'}
            onClick={() => scrollToSection('myTeams')}
          >
            My Teams
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <div className="space-y-8">
            <div ref={sectionRefs.overview}>
              <h3 className="text-lg font-semibold mb-2">Match Overview</h3>
              <p>Match details and statistics will be displayed here.</p>
            </div>
            <div ref={sectionRefs.prizePools}>
              <h3 className="text-lg font-semibold mb-2">Prize Pools</h3>
              <PrizePools onCreateTeam={onCreateTeam} />
            </div>
            <div ref={sectionRefs.myTeams}>
              <h3 className="text-lg font-semibold mb-2">My Teams</h3>
              <MyTeams teams={teams} onCreateTeam={onCreateTeam} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetails;