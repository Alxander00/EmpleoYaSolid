jsx
import { useParams, useNavigate } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function DetalleVacante() {
  const params = useParams();
  const navigate = useNavigate();
  const [vacante, setVacante] = createSignal(null);
  const { usuario } = useAuth();

  onMount(async () => {
    try {
      const datos = await api.get(`/vacantes/${params.id}`);
      setVacante(datos);
    } catch (err) {
      console.error(err);
    }
  });

  const postular = async () => {
    if (!usuario()) {
      navigate('/login');
      return;
    }
    if (usuario().rol !== 'CANDIDATO') {
      alert('Solo los candidatos pueden postularse');
      return;
    }
    try {
      await api.post('/postulaciones', { vacanteId: params.id });
      alert('Postulación enviada exitosamente');
      navigate('/mis-postulaciones');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!vacante()) return <div class="text-center py-5">Cargando...</div>;

  return (
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h2 class="fw-bold">{vacante().titulo_puesto}</h2>
          <div class="d-flex gap-3 my-3">
            <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">{vacante().modalidad}</span>
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"><i class="bi bi-geo-alt me-1"></i>{vacante().ubicacion_especifica || 'No especificada'}</span>
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"><i class="bi bi-cash-stack me-1"></i>{vacante().rango_salarial_max ? `$${vacante().rango_salarial_max}` : 'A convenir'}</span>
          </div>
          <div class="mb-4">
            <h6 class="fw-bold">Descripción del puesto</h6>
            <p class="text-muted">{vacante().descripcion_puesto}</p>
          </div>
          <div class="mb-4">
            <h6 class="fw-bold">Requisitos</h6>
            <p class="text-muted">{vacante().requisitos}</p>
          </div>
          <div class="mb-4">
            <h6 class="fw-bold">Beneficios</h6>
            <p class="text-muted">{vacante().beneficios || 'No especificados'}</p>
          </div>
          <button onClick={postular} class="btn btn-primary rounded-pill py-3 fw-bold">Postularme ahora</button>
        </div>
      </div>
    </div>
  );
}
