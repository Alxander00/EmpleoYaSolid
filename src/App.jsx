import { Router, Route, Routes } from '@solidjs/router';
import { ProveedorAuth } from './context/AuthContext';
import BarraNavegacion from './components/BarraNavegacion';

export default function App() {
  return (
    <ProveedorAuth>
      <Router>
        <BarraNavegacion />
        <main class="container py-4">
          <Routes>
            {/* Las rutas se agregarán después */}
          </Routes>
        </main>
      </Router>
    </ProveedorAuth>
  );
}