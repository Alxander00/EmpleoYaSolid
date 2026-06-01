jsx
import { useParams } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

export default function PostulantesVacante() {
  const params = useParams();
  const [postulantes, setPostulantes] = createSignal([]);
  const [tituloVacante, setTituloVacante] = createSignal('');

  onMount(async () => {
    const datos = await api.get(`/postulaciones/vacante/${params.id}/postulantes`);
    setPostulantes(datos.postulantes || []);
    setTituloVacante(datos.vacante?.titulo || '');
  });

  const cambiarEstado = async (postulacionId, nuevoEstado) => {
    await api.patch(`/postulaciones/${postulacionId}`, { etapa_actual: nuevoEstado });
    setPostulantes(postulantes().map(p => 
      p.postulacion_id === postulacionId ? { ...p, etapa_actual: nuevoEstado } : p
    ));
  };

  const colorEstado = (estado) => {
    const colores = { RECIBIDA: 'secondary', EN_REVISION: 'warning', PRUEBA_TECNICA: 'dark', ENTREVISTA: 'info', OFERTA: 'primary', RECHAZADA: 'danger', CONTRATADO: 'success' };
    return colores[estado] || 'secondary';
  };

  return (
    <div>
      <h2 class="fw-bold mb-4">Postulantes para: {tituloVacante()}</h2>
      <div class="row g-4">
        {postulantes().map(p => (
          <div class="col-md-6 col-lg-4">
            <div class="card p-4 h-100 shadow-sm border-0 rounded-4">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="avatar-sm bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold">
                  {p.nombres?.[0]}{p.apellidos?.[0]}
                </div>
                <div>
                  <h6 class="fw-bold mb-0">{p.nombres} {p.apellidos}</h6>
                  <small class="text-muted">{p.titular_profesional || 'Candidato'}</small>
                </div>
              </div>
              <div class="mb-3">
                <span class="badge bg-light text-dark rounded-pill me-2">Estado actual:</span>
                <span class={`badge bg-${colorEstado(p.etapa_actual)} rounded-pill`}>{p.etapa_actual.replace('_', ' ')}</span>
              </div>
              <select class="form-select rounded-pill mb-3" onChange={(e) => cambiarEstado(p.postulacion_id, e.target.value)} value={p.etapa_actual}>
                <option value="RECIBIDA">Recibida</option>
                <option value="EN_REVISION">En revisión</option>
                <option value="PRUEBA_TECNICA">Prueba técnica</option>
                <option value="ENTREVISTA">Entrevista</option>
                <option value="OFERTA">Oferta</option>
                <option value="RECHAZADA">Rechazar</option>
                <option value="CONTRATADO">Contratar</option>
              </select>
              {p.url_curriculum_pdf && (
                <a href={p.url_curriculum_pdf} target="_blank" class="btn btn-outline-primary btn-sm rounded-pill w-100">Ver CV</a>
              )}
            </div>
          </div>
        ))}
        {postulantes().length === 0 && <div class="col-12 text-center py-5 text-muted">Aún no hay postulantes para esta vacante.</div>}
      </div>
    </div>
  );
}