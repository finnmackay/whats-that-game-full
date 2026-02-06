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
      <div className="bg-[var(--color-card)] rounded-xl p-4 cursor-pointer hover:bg-[var(--color-card-hover)] hover:-translate-y-1 transition-all shadow-sm hover:shadow-md aspect-[2.5/3.5] flex flex-col">
        {/* Top corner - game type */}
        <div className="text-xs text-black/40 capitalize mb-2">{game.gameType}</div>

        {/* Emoji - centered hero */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-6xl">{game.emoji}</div>
        </div>

        {/* Card info */}
        <div className="text-center mt-2">
          <h2 className="text-base font-semibold text-black truncate">{game.name}</h2>
          <p className="text-black/50 text-xs mt-1 line-clamp-2">{game.description}</p>
        </div>

        {/* Bottom row - meta + upvote */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
          <div className="text-xs text-black/40">
            {game.playerCount.min}-{game.playerCount.max}p · {game.duration}
          </div>
          <button
            onClick={handleUpvote}
            className={`px-2 py-1 rounded-md transition-all text-xs flex items-center gap-1 ${
              hasUpvoted
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-black/5 text-black/50 hover:text-black'
            }`}
          >
            <ArrowUp size={12} />
            <span>{voteCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
