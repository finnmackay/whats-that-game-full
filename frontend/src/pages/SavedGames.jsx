import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import GameCard from '../components/GameCard';
import { ArrowLeft, Star, Globe } from 'lucide-react';

export default function SavedGames() {
  const { savedGames } = useGames();

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
            <Star size={48} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                Saved Games
              </h1>
              <p className="text-black/50 text-lg mt-2">
                {savedGames.length} games saved
              </p>
            </div>
          </div>
        </header>

        {savedGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {savedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-16 text-center">
            <Star size={64} strokeWidth={1.5} className="mx-auto text-black/30 mb-8" />
            <p className="text-black/50 text-lg mb-8">No saved games yet</p>
            <Link to="/world-vault">
              <button className="glass-button px-8 py-4 text-black/70 hover:text-black transition-colors text-lg font-medium">
                <Globe size={20} />
                <span>Explore World Vault</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
