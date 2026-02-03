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
      <div className="glass-card p-5 cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors">
        <div className="flex gap-4">
          {/* Emoji */}
          <div className="text-5xl pt-1">
            {game.emoji}
          </div>

          {/* Game Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-black">
                {game.name}
              </h2>
              {/* Upvote */}
              <button
                onClick={handleUpvote}
                className={`glass-button px-3 py-1.5 transition-all text-sm flex items-center gap-1 shrink-0 ${
                  hasUpvoted
                    ? 'glass-button-active'
                    : 'text-black/50 hover:text-black'
                }`}
              >
                <ArrowUp size={14} />
                <span>{voteCount}</span>
              </button>
            </div>
            <p className="text-black/50 text-sm mt-1 line-clamp-2">
              {game.description}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-black/40">
              <span>{game.playerCount.min}-{game.playerCount.max} players</span>
              <span>·</span>
              <span>{game.duration}</span>
              <span>·</span>
              <span>{game.gameType}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
