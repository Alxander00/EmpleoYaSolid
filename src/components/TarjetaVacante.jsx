
import { Link } from '@solidjs/router';

export default function TarjetaVacante(props) {
  const vacante = () => props.vacante;
  return (
    <div class="job-card p-4 h-100 d-flex flex-column shadow-sm border bg-white rounded-4">
      <div class="d-flex justify-content-between mb-2">
        <span class="badge bg-primary bg-opacity-10 text-primary">{vacante().modalidad}</span>
        <span class="text-success fw-bold">{vacante().rango_salarial_max ? `$${vacante().rango_salarial_max}` : 'A convenir'}</span>
      </div>
      <h5 class="fw-bold text-dark">{vacante().titulo_puesto}</h5>
      <div class="small text-muted mb-2">
        <i class="bi bi-building me-1"></i> {vacante().nombre_comercial || vacante().razon_social}
      </div>
      <p class="text-muted small flex-grow-1">{vacante().descripcion_puesto?.substring(0, 100)}...</p>
      <div class="mt-auto pt-3 border-top">
        <Link href={`/vacantes/${vacante().id}`} class="btn btn-primary rounded-pill w-100 fw-bold">
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
