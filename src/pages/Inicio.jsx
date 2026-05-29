import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';
import TarjetaVacante from '../components/TarjetaVacante';

export default function Inicio() {
  const [vacantes, setVacantes] = createSignal([]);
  onMount(async () => {
    try {
      const datos = await api.get('/vacantes');
      setVacantes(datos);
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <div>
      <div class="text-center mb-5">
        <h1 class="fw-bold display-5 mb-3">Encuentra tu próximo empleo hoy</h1>
        <p class="text-muted fs-5">Más de 5,000 ofertas activas en tecnología con el respaldo de EmpleoYa.</p>
      </div>
      <h5 class="fw-bold mb-4"><i class="bi bi-star-fill text-warning me-2"></i>Ofertas destacadas</h5>
      <div class="row g-4">
        {vacantes().slice(0, 6).map(v => (
          <div class="col-md-6 col-lg-4">
            <TarjetaVacante vacante={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
