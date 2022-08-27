import { Routes, Route } from 'react-router-dom';
import { Home, Category } from "./pages";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:category' element={<Category />} />
      </Routes>
    </div>
  );
}
