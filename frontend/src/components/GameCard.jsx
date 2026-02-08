import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { ArrowUp, Heart } from 'lucide-react';

export default function GameCard({ game }) {
  const { upvotes, userUpvotes, toggleUpvote, savedGameIds, toggleSaved } = useGames();

  const voteCount = upvotes[game.id];
  const hasUpvoted = userUpvotes[game.id];
  const isSaved = savedGameIds.includes(game.id);

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleUpvote(game.id);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaved(game.id);
  };

  return (
    <Link to={`/game/${game.id}`}>
      <div className="bg-[var(--color-card)] rounded-2xl p-4 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all shadow-md aspect-[2.5/3.5] flex flex-col border-2 border-black/10">
        {/* Name at top - 20px from top */}
        <h2 className="text-lg font-bold text-black text-center leading-tight mt-3">{game.name}</h2>

        {/* Emoji - centered */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-6xl">{game.emoji}</span>
        </div>

        {/* Blurb under emoji */}
        <p className="text-xs text-black/50 text-center line-clamp-2 leading-relaxed mb-4">{game.description}</p>

        {/* Bottom row - upvotes left, save right */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
              hasUpvoted
                ? 'text-[var(--color-primary)]'
                : 'text-black/40 hover:text-black'
            }`}
          >
            <ArrowUp size={16} fill={hasUpvoted ? 'currentColor' : 'none'} />
            <span>{voteCount}</span>
          </button>

          <button
            onClick={handleSave}
            className={`transition-all ${
              isSaved
                ? 'text-red-500'
                : 'text-black/40 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </Link>
  );
}
