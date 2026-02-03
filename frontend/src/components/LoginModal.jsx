import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, UserPlus } from 'lucide-react';

export default function LoginModal() {
  const { showLoginModal, closeLoginModal, login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Signup fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  if (!showLoginModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isSignUp) {
      result = await signup(firstname, lastname, email, username, password, country);
    } else {
      result = await login(username, password);
    }

    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Something went wrong');
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setEmail('');
    setCountry('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 py-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeLoginModal}
      />

      {/* Modal */}
      <div className="glass-card p-10 w-full max-w-md relative">
        <button
          onClick={closeLoginModal}
          className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          {isSignUp ? (
            <UserPlus size={48} strokeWidth={1.5} className="mx-auto text-black/70 mb-4" />
          ) : (
            <LogIn size={48} strokeWidth={1.5} className="mx-auto text-black/70 mb-4" />
          )}
          <h2 className="text-3xl font-semibold text-black">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <p className="text-black/50 mt-2">
            {isSignUp ? 'Create an account to contribute' : 'Sign in to upvote games'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="John"
                    required
                    className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Doe"
                    required
                    className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Your country"
                  className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
              className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wider text-black/40 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? 'Create password' : 'Enter password'}
              required
              className="glass-input w-full px-4 py-3 text-base text-black placeholder-black/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button glass-button-active py-4 text-lg font-semibold mt-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                {isSignUp ? <UserPlus size={20} /> : <LogIn size={20} />}
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-black/40 text-sm mt-6">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={switchMode}
            className="text-black/60 hover:text-black transition-colors"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
