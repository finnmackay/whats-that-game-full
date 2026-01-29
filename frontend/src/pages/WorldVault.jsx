import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Search } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useGames } from '../context/GameContext';

const GAME_TYPES = ['all', 'card', 'dice', 'party', 'strategy'];

export default function WorldVault() {
  const { games } = useGames();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = games.filter(game => {
    const matchesType = activeFilter === 'all' || game.gameType === activeFilter;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <Link to="/" className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors mb-8 text-base">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-6">
            <Globe size={48} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                World Vault
              </h1>
              <p className="text-black/50 text-lg mt-2">
                {games.length} games from the community
              </p>
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="mb-8 relative">
          <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-black/30" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full pl-14 pr-8 py-5 text-lg text-black placeholder-black/30"
          />
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="flex gap-6 flex-wrap">
            {GAME_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`glass-button px-6 py-4 capitalize text-base font-medium transition-all ${
                  activeFilter === type
                    ? 'glass-button-active'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-16 text-center text-black/40 text-lg">
            No games found
          </div>
        )}
      </div>
    </div>
  );
}
