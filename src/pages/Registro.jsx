import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { api } from '../services/api';

export default function Registro() {
  const [rol, setRol] = createSignal('CANDIDATO');
  const [nombre, setNombre] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [confirmar, setConfirmar] = createSignal('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password() !== confirmar()) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await api.post('/registro', {
        rol: rol(),
        nombre: nombre(),
        correo_electronico: email(),
        password: password()
      });
      alert('Registro exitoso. Ahora inicia sesión.');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm rounded-4 border-0">
          <h2 class="text-center mb-4 fw-bold">Crear cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Tipo de cuenta</label>
              <select class="form-select rounded-pill" onInput={(e) => setRol(e.target.value)}>
                <option value="CANDIDATO">Candidato (busco empleo)</option>
                <option value="EMPRESA">Empresa (publico vacantes)</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Nombre completo / Razón social</label>
              <input type="text" class="form-control rounded-pill" required onInput={(e) => setNombre(e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Correo electrónico</label>
              <input type="email" class="form-control rounded-pill" required onInput={(e) => setEmail(e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Contraseña</label>
              <input type="password" class="form-control rounded-pill" required minlength="4" onInput={(e) => setPassword(e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Confirmar contraseña</label>
              <input type="password" class="form-control rounded-pill" required onInput={(e) => setConfirmar(e.target.value)} />
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold">Registrarse</button>
          </form>
          <div class="text-center mt-3">
            <span class="text-muted">¿Ya tienes cuenta? </span>
            <a href="/login" class="text-primary fw-bold text-decoration-none">Iniciar sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
}
