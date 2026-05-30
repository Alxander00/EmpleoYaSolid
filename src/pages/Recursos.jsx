import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

export default function Recursos() {
  const [recursos, setRecursos] = createSignal([]);

  onMount(async () => {
    const datos = await api.get('/recursos');
    setRecursos(datos);
  });

  return (
    <div>
      <h2 class="fw-bold mb-4"><i class="bi bi-journal-bookmark-fill text-primary me-2"></i>Biblioteca de recursos</h2>
      <div class="row g-4">
        {recursos().map(r => (
          <div class="col-md-6 col-lg-4">
            <div class="card p-4 h-100 border-0 shadow-sm rounded-4">
              <div class="bg-light p-4 text-center rounded-4 mb-3">
                <i class="bi bi-journal-bookmark-fill fs-1 text-primary opacity-50"></i>
              </div>
              <h5 class="fw-bold text-dark">{r.titulo}</h5>
              <p class="text-muted small">{r.resumen}</p>
              <div class="mt-auto">
                <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">{r.tipo}</span>
              </div>
            </div>
          </div>
        ))}
        {recursos().length === 0 && <div class="col-12 text-center py-5 text-muted">No hay recursos disponibles.</div>}
      </div>
    </div>
  );
}
