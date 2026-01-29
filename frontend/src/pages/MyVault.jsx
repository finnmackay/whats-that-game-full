import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Plus } from 'lucide-react';

export default function MyVault() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 py-12 md:px-10 md:py-16">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-12">
          <Link to="/" className="glass-button px-5 py-3 text-black/60 hover:text-black transition-colors mb-8 text-base">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-6">
            <Lock size={48} strokeWidth={1.5} className="text-black/70" />
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
                My Vault
              </h1>
              <p className="text-black/50 text-lg mt-2">
                Your personal game collection
              </p>
            </div>
          </div>
        </header>

        <div className="glass-card p-16 text-center">
          <Lock size={64} strokeWidth={1.5} className="mx-auto text-black/30 mb-8" />
          <h2 className="text-3xl font-semibold text-black mb-4">
            Coming Soon
          </h2>
          <p className="text-black/50 text-lg max-w-md mx-auto leading-relaxed">
            Create your own private collection of games. Add personal variations, family rules, or games only you know.
          </p>
          <Link to="/add">
            <button className="glass-button mt-10 px-8 py-4 text-black/70 hover:text-black transition-colors text-lg font-medium">
              <Plus size={20} />
              <span>Add Your First Game</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
