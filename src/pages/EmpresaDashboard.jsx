jsx
import { createSignal, onMount } from 'solid-js';
import { Link } from '@solidjs/router';
import { api } from '../services/api';

export default function EmpresaDashboard() {
  const [vacantes, setVacantes] = createSignal([]);

  onMount(async () => {
    const datos = await api.get('/vacantes/mis-vacantes');
    setVacantes(datos);
  });

  const eliminar = async (id) => {
    if (confirm('¿Eliminar esta vacante permanentemente?')) {
      await api.delete(`/vacantes/${id}`);
      setVacantes(vacantes().filter(v => v.id !== id));
    }
  };

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold"><i class="bi bi-briefcase-fill text-primary me-2"></i>Mis vacantes</h2>
        <Link href="/empresa/crear-vacante" class="btn btn-primary rounded-pill px-4 shadow-sm">
          <i class="bi bi-plus-lg me-2"></i>Publicar oferta
        </Link>
      </div>
      <div class="row g-4">
        {vacantes().map(v => (
          <div class="col-md-6 col-lg-4">
            <div class="card p-4 h-100 shadow-sm border-0 rounded-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill">{v.modalidad}</span>
                <span class={`badge ${v.estado === 'PUBLICADA' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${v.estado === 'PUBLICADA' ? 'success' : 'secondary'}`}>{v.estado || 'ACTIVA'}</span>
              </div>
              <h5 class="fw-bold">{v.titulo_puesto}</h5>
              <p class="text-muted small mt-2 flex-grow-1">{v.descripcion_puesto?.substring(0, 80)}...</p>
              <div class="mt-3 d-flex gap-2">
                <Link href={`/empresa/vacante/${v.id}/postulantes`} class="btn btn-outline-primary btn-sm rounded-pill flex-grow-1">Postulantes</Link>
                <button onClick={() => eliminar(v.id)} class="btn btn-outline-danger btn-sm rounded-pill">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
        {vacantes().length === 0 && <div class="col-12 text-center py-5 text-muted">No tienes vacantes publicadas.</div>}
      </div>
    </div>
  );
}