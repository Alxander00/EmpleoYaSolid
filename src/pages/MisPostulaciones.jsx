jsx
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

export default function MisPostulaciones() {
  const [postulaciones, setPostulaciones] = createSignal([]);

  onMount(async () => {
    const datos = await api.get('/postulaciones/mis-postulaciones');
    setPostulaciones(datos);
  });

  const colorEstado = (estado) => {
    const colores = { RECIBIDA: 'secondary', EN_REVISION: 'warning', PRUEBA_TECNICA: 'dark', ENTREVISTA: 'info', OFERTA: 'success', RECHAZADA: 'danger', CONTRATADO: 'success' };
    return colores[estado] || 'secondary';
  };

  return (
    <div>
      <h2 class="fw-bold mb-4"><i class="bi bi-send-check-fill text-primary me-2"></i>Mis postulaciones</h2>
      <div class="row g-4">
        {postulaciones().map(p => (
          <div class="col-md-6 col-lg-4">
            <div class="card p-4 h-100 shadow-sm border-0 rounded-4">
              <h5 class="fw-bold">{p.titulo_puesto}</h5>
              <div class="text-muted small mb-2">{p.empresa}</div>
              <div class="mb-3">
                <span class="badge bg-light text-dark me-2">Estado:</span>
                <span class={`badge bg-${colorEstado(p.etapa_actual)}`}>{p.etapa_actual.replace('_', ' ')}</span>
              </div>
              <small class="text-muted">Postulado el {new Date(p.fecha_postulacion).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
        {postulaciones().length === 0 && <div class="col-12 text-center py-5 text-muted">Aún no te has postulado a ninguna vacante.</div>}
      </div>
    </div>
  );
}
