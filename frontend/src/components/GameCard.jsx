import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { Star, ArrowUp } from 'lucide-react';

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
      <div className="glass-card p-8 flex flex-col h-full cursor-pointer">
        {/* Emoji Illustration */}
        <div className="text-7xl text-center py-10">
          {game.emoji}
        </div>

        {/* Game Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-black text-center mb-3">
            {game.name}
          </h2>

          <p className="text-black/50 text-base text-center mb-6">
            {game.description}
          </p>

          {/* Meta Info */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <span className="glass-button px-4 py-2 text-sm text-black/60">{game.playerCount.min}-{game.playerCount.max} players</span>
            <span className="glass-button px-4 py-2 text-sm text-black/60">{game.duration}</span>
            <span className="glass-button px-4 py-2 text-sm text-black/60">{game.ageRating}</span>
          </div>

          {/* Rules Preview */}
          <div className="border-t border-black/5 pt-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-3">
              Rules
            </h3>
            <p className="text-base text-black/60 leading-relaxed line-clamp-4">
              {game.rules}
            </p>
          </div>

          {/* Equipment */}
          <div className="mt-6">
            <h3 className="text-sm font-medium uppercase tracking-wider text-black/40 mb-3">
              Equipment
            </h3>
            <div className="flex flex-wrap gap-2">
              {game.equipment.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-sm glass-button px-4 py-2 text-black/60"
                >
                  {item}
                </span>
              ))}
              {game.equipment.length > 3 && (
                <span className="text-sm text-black/40 px-2 py-2">+{game.equipment.length - 3} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer with upvote and save */}
        <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
          <div className="text-sm text-black/40">
            by {game.contributor.name}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className={`glass-button px-5 py-3 transition-all text-base ${
                isSaved
                  ? 'glass-button-active'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <Star size={18} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleUpvote}
              className={`glass-button px-5 py-3 transition-all text-base ${
                hasUpvoted
                  ? 'glass-button-active'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <ArrowUp size={18} />
              <span>{voteCount}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
