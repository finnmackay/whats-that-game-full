import { Link } from 'react-router-dom';
import { useGames } from '../context/GameContext';
import { ArrowUp } from 'lucide-react';

export default function GameCard({ game }) {
  const { upvotes, userUpvotes, toggleUpvote } = useGames();

  const voteCount = upvotes[game.id];
  const hasUpvoted = userUpvotes[game.id];

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleUpvote(game.id);
  };

  return (
    <Link to={`/game/${game.id}`}>
      <div className="glass-card p-6 cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors">
        <div className="flex items-center gap-4">
          {/* Emoji */}
          <div className="text-4xl">
            {game.emoji}
          </div>

          {/* Game Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-black truncate">
              {game.name}
            </h2>
            <p className="text-black/50 text-sm mt-1 line-clamp-1">
              {game.playerCount.min}-{game.playerCount.max} players · {game.duration}
            </p>
          </div>

          {/* Upvote */}
          <button
            onClick={handleUpvote}
            className={`glass-button px-3 py-2 transition-all text-sm flex items-center gap-1 ${
              hasUpvoted
                ? 'glass-button-active'
                : 'text-black/50 hover:text-black'
            }`}
          >
            <ArrowUp size={16} />
            <span>{voteCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
