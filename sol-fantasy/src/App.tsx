import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MatchList from './components/MatchList';
import MatchDetails from './components/MatchDetails';
import CreateTeam from './components/CreateTeam';
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ScrollArea } from "./components/ui/scroll-area";

// Mock API functions (you should replace these with actual API calls)
const fetchLiveMatches = async (sport: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const matches = {
    cricket: [
      { 
        id: 1, 
        team1: { name: "India", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Australia", logo: "/placeholder.svg?height=40&width=40" },
        time: "Live",
        timeRemaining: "65:00",
        tournament: "ICC World Cup"
      },
      { 
        id: 2, 
        team1: { name: "England", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "South Africa", logo: "/placeholder.svg?height=40&width=40" },
        time: "20:00",
        timeRemaining: "Starts in 2h 30m",
        tournament: "T20 Series"
      },
      { 
        id: 3, 
        team1: { name: "New Zealand", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "West Indies", logo: "/placeholder.svg?height=40&width=40" },
        time: "18:30",
        timeRemaining: "Starts in 45m",
        tournament: "ODI Series"
      },
    ],
    soccer: [
      { 
        id: 1, 
        team1: { name: "Real Madrid", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Barcelona", logo: "/placeholder.svg?height=40&width=40" },
        time: "Live",
        timeRemaining: "65:00",
        tournament: "La Liga"
      },
      { 
        id: 2, 
        team1: { name: "Manchester City", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Liverpool", logo: "/placeholder.svg?height=40&width=40" },
        time: "20:00",
        timeRemaining: "Starts in 2h 30m",
        tournament: "Premier League"
      },
      { 
        id: 3, 
        team1: { name: "PSG", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Bayern Munich", logo: "/placeholder.svg?height=40&width=40" },
        time: "18:30",
        timeRemaining: "Starts in 45m",
        tournament: "Champions League"
      },
    ],
    nba: [
      { 
        id: 1, 
        team1: { name: "Lakers", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Warriors", logo: "/placeholder.svg?height=40&width=40" },
        time: "Live",
        timeRemaining: "Q3 8:24",
        tournament: "NBA"
      },
      { 
        id: 2, 
        team1: { name: "Celtics", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "Nets", logo: "/placeholder.svg?height=40&width=40" },
        time: "20:00",
        timeRemaining: "Starts in 2h 30m",
        tournament: "NBA"
      },
      { 
        id: 3, 
        team1: { name: "Bucks", logo: "/placeholder.svg?height=40&width=40" }, 
        team2: { name: "76ers", logo: "/placeholder.svg?height=40&width=40" },
        time: "18:30",
        timeRemaining: "Starts in 45m",
        tournament: "NBA"
      },
    ]
  };
  
  return matches[sport as keyof typeof matches] || [];
};

const fetchPlayers = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const players = [
    { id: 1, name: "Player 1", team: "Team A", points: 10, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Player 2", team: "Team A", points: 8, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Player 3", team: "Team B", points: 9, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Player 4", team: "Team B", points: 7, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 5, name: "Player 5", team: "Team A", points: 6, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 6, name: "Player 6", team: "Team B", points: 8, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 7, name: "Player 7", team: "Team A", points: 7, avatar: "/placeholder.svg?height=32&width=32" },
    { id: 8, name: "Player 8", team: "Team B", points: 9, avatar: "/placeholder.svg?height=32&width=32" },
  ];
  
  return players;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      const fetchedMatches = await fetchLiveMatches(selectedSport);
      setMatches(fetchedMatches);
      setIsLoading(false);
    };
    loadMatches();
  }, [selectedSport]);

  useEffect(() => {
    if (selectedMatch) {
      const loadPlayers = async () => {
        const fetchedPlayers = await fetchPlayers();
        setPlayers(fetchedPlayers);
      };
      loadPlayers();
    }
  }, [selectedMatch]);

  const handleCreateTeam = () => {
    setIsCreateTeamOpen(true);
  };

  const handleSaveTeam = (team: any) => {
    setTeams([...teams, { id: teams.length + 1, ...team }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={selectedSport} onValueChange={setSelectedSport} className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="bg-white shadow-sm rounded-full p-1 inline-flex">
              <TabsTrigger value="cricket" className="rounded-full data-[state=active]:bg-gray-100">
                Cricket
              </TabsTrigger>
              <TabsTrigger value="soccer" className="rounded-full data-[state=active]:bg-gray-100">
                Soccer
              </TabsTrigger>
              <TabsTrigger value="nba" className="rounded-full data-[state=active]:bg-gray-100">
                NBA
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </Tabs>

        <MatchList
          isLoading={isLoading}
          matches={matches}
          onSelectMatch={setSelectedMatch}
        />

        <MatchDetails
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onCreateTeam={handleCreateTeam}
          teams={teams}
        />

        <CreateTeam
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onSaveTeam={handleSaveTeam}
          players={players}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;