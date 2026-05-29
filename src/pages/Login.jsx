import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datos = await iniciarSesion(email(), password());
      const rol = datos.usuario.rol;
      if (rol === 'EMPRESA') navigate('/empresa');
      else navigate('/vacantes');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card p-4 shadow-sm rounded-4 border-0">
          <h2 class="text-center mb-4 fw-bold">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Correo electrónico</label>
              <input type="email" class="form-control rounded-pill" required onInput={(e) => setEmail(e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Contraseña</label>
              <input type="password" class="form-control rounded-pill" required onInput={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold">Ingresar</button>
          </form>
          <div class="text-center mt-3">
            <span class="text-muted">¿No tienes cuenta? </span>
            <a href="/registro" class="text-primary fw-bold text-decoration-none">Regístrate gratis</a>
          </div>
        </div>
      </div>
    </div>
  );
}
