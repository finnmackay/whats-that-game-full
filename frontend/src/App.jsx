import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorldVault from './pages/WorldVault';
import MyVault from './pages/MyVault';
import GameDetail from './pages/GameDetail';
import SavedGames from './pages/SavedGames';
import AddGame from './pages/AddGame';
import LoginModal from './components/LoginModal';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world-vault" element={<WorldVault />} />
        <Route path="/my-vault" element={<MyVault />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/saved" element={<SavedGames />} />
        <Route path="/add" element={<AddGame />} />
      </Routes>
      <LoginModal />
    </>
  );
}

export default App;
