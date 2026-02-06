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
      <div className="bg-[var(--color-card)] rounded-2xl p-6 cursor-pointer hover:bg-[var(--color-card-hover)] hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg aspect-[2.5/3.5] flex flex-col border border-black/5">
        {/* Name at top */}
        <h2 className="text-sm font-bold text-black text-center leading-tight pt-1">{game.name}</h2>

        {/* Emoji - centered */}
        <div className="flex-1 flex items-center justify-center py-4">
          <span className="text-6xl drop-shadow-sm">{game.emoji}</span>
        </div>

        {/* Blurb under emoji */}
        <p className="text-[11px] text-black/50 text-center line-clamp-2 px-1">{game.description}</p>

        {/* Upvote pill */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleUpvote}
            className={`px-4 py-2 rounded-full transition-all text-xs font-medium flex items-center gap-1.5 ${
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
