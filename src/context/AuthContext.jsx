import { createContext, useContext, createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

const AuthContext = createContext();

export const ProveedorAuth = (props) => {
  const [usuario, setUsuario] = createSignal(null);
  const [cargando, setCargando] = createSignal(true);

  const iniciarSesion = async (email, password) => {
    const datos = await api.post('/login', { correo_electronico: email, password });
    localStorage.setItem('token', datos.token);
    setUsuario(datos.usuario);
    return datos;
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    window.location.href = '/';
  };

  const obtenerUsuarioActual = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCargando(false);
      return;
    }
    try {
      const datos = await api.get('/perfil');
      setUsuario(datos);
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setCargando(false);
    }
  };

  onMount(obtenerUsuarioActual);

  const store = { usuario, cargando, iniciarSesion, cerrarSesion };
  return <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);