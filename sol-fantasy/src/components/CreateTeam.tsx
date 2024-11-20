import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Player {
  id: number;
  name: string;
  team: string;
  points: number;
  avatar: string;
}

interface CreateTeamProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTeam: (team: any) => void;
  players: Player[];
}

const CreateTeam: React.FC<CreateTeamProps> = ({ isOpen, onClose, onSaveTeam, players }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [captain, setCaptain] = useState<number | null>(null);
  const [viceCaptain, setViceCaptain] = useState<number | null>(null);

  const handlePlayerSelection = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
      if (captain === playerId) setCaptain(null);
      if (viceCaptain === playerId) setViceCaptain(null);
    } else if (selectedPlayers.length < 6) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const handleSaveTeam = () => {
    if (selectedPlayers.length === 6 && captain && viceCaptain) {
      onSaveTeam({
        players: selectedPlayers,
        captain,
        viceCaptain
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Your Team</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {players.map((player) => (
              <div key={player.id} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <Checkbox
                  id={`player-${player.id}`}
                  checked={selectedPlayers.includes(player.id)}
                  onCheckedChange={() => handlePlayerSelection(player.id)}
                  disabled={selectedPlayers.length >= 6 && !selectedPlayers.includes(player.id)}
                />
                <Label htmlFor={`player-${player.id}`} className="flex-grow">
                  {player.name} ({player.team}) - {player.points} pts
                </Label>
                {selectedPlayers.includes(player.id) && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={captain === player.id ? "default" : "outline"}
                      onClick={() => {
                        if (captain === player.id) {
                          setCaptain(null);
                        } else {
                          setCaptain(player.id);
                          if (viceCaptain === player.id) setViceCaptain(null);
                        }
                      }}
                    >
                      C
                    </Button>
                    <Button
                      size="sm"
                      variant={viceCaptain === player.id ? "default" : "outline"}
                      onClick={() => {
                        if (viceCaptain === player.id) {
                          setViceCaptain(null);
                        } else {
                          setViceCaptain(player.id);
                          if (captain === player.id) setCaptain(null);
                        }
                      }}
                    >
                      VC
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="text-sm text-gray-500">
            Selected: {selectedPlayers.length}/6
            {captain && " (C)"}
            {viceCaptain && " (VC)"}
          </div>
          <Button
            onClick={handleSaveTeam}
            disabled={selectedPlayers.length !== 6 || !captain || !viceCaptain}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Save Team
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeam;