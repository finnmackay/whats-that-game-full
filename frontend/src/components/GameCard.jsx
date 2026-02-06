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
      <div className="bg-[var(--color-card)] rounded-2xl p-5 cursor-pointer hover:bg-[var(--color-card-hover)] hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg aspect-[2.5/3.5] flex flex-col border border-black/5">
        {/* Emoji - large centered */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-7xl drop-shadow-sm">{game.emoji}</span>
        </div>

        {/* Card info */}
        <div className="text-center space-y-1">
          <h2 className="text-sm font-bold text-black leading-tight">{game.name}</h2>
          <p className="text-[11px] text-black/40">
            {game.playerCount.min}-{game.playerCount.max} players · {game.duration}
          </p>
        </div>

        {/* Upvote pill */}
        <div className="flex justify-center mt-3">
          <button
            onClick={handleUpvote}
            className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium flex items-center gap-1.5 ${
              hasUpvoted
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-black/5 text-black/50 hover:bg-black/10 hover:text-black'
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
