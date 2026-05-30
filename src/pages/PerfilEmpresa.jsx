jsx
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

export default function PerfilEmpresa() {
  const [empresa, setEmpresa] = createSignal({
    razon_social: '',
    nombre_comercial: '',
    sitio_web: '',
    descripcion_empresa: '',
    ubicacion_sede: '',
    url_logo: '',
  });

  onMount(async () => {
    try {
      const datos = await api.get('/empresas/mi-empresa');
      setEmpresa(datos);
    } catch (err) {
      console.error('Perfil no encontrado');
    }
  });

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/empresas/mi-empresa', empresa());
      alert('Perfil de empresa actualizado');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h2 class="fw-bold mb-4">Perfil de la empresa</h2>
          <form onSubmit={guardar}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Razón social *</label>
              <input type="text" class="form-control rounded-pill" required value={empresa().razon_social} onInput={(e) => setEmpresa({...empresa(), razon_social: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Nombre comercial</label>
              <input type="text" class="form-control rounded-pill" value={empresa().nombre_comercial} onInput={(e) => setEmpresa({...empresa(), nombre_comercial: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Sitio web</label>
              <input type="url" class="form-control rounded-pill" value={empresa().sitio_web} onInput={(e) => setEmpresa({...empresa(), sitio_web: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Ubicación de la sede *</label>
              <input type="text" class="form-control rounded-pill" required value={empresa().ubicacion_sede} onInput={(e) => setEmpresa({...empresa(), ubicacion_sede: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Descripción de la empresa</label>
              <textarea class="form-control rounded-4" rows="4" value={empresa().descripcion_empresa} onInput={(e) => setEmpresa({...empresa(), descripcion_empresa: e.target.value})}></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">URL del logo</label>
              <input type="url" class="form-control rounded-pill" value={empresa().url_logo} onInput={(e) => setEmpresa({...empresa(), url_logo: e.target.value})} />
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold">Guardar datos</button>
          </form>
        </div>
      </div>
    </div>
  );
}
