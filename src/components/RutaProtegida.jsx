import { Navigate } from '@solidjs/router';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida(props) {
  const { usuario, cargando } = useAuth();
  if (cargando()) return <div class="text-center mt-5">Cargando...</div>;
  if (!usuario()) return <Navigate href="/login" />;
  return props.children;
}