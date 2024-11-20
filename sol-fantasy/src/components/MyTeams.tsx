import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface MyTeamsProps {
  teams: any[];
  onCreateTeam: () => void;
}

const MyTeams: React.FC<MyTeamsProps> = ({ teams, onCreateTeam }) => {
  return (
    <div>
      {teams.length > 0 ? (
        <div className="space-y-4">
          {teams.map((team) => (
            <Card key={team.id} className="bg-white overflow-hidden">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Team {team.id}</h4>
                <div className="flex flex-wrap gap-2">
                  {team.players.map((playerId: number) => (
                    <Badge key={playerId} variant="secondary">
                      Player {playerId} {team.captain === playerId && '(C)'} {team.viceCaptain === playerId && '(VC)'}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>You haven't created any teams yet. Create a team to get started!</p>
      )}
      <Button 
        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        onClick={onCreateTeam}
      >
        Create New Team
      </Button>
    </div>
  );
};

export default MyTeams;