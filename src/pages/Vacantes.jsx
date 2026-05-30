jsx
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';
import TarjetaVacante from '../components/TarjetaVacante';

export default function Vacantes() {
  const [vacantes, setVacantes] = createSignal([]);
  const [busqueda, setBusqueda] = createSignal('');
  const [filtradas, setFiltradas] = createSignal([]);

  onMount(async () => {
    const datos = await api.get('/vacantes');
    setVacantes(datos);
    setFiltradas(datos);
  });

  const buscar = () => {
    const term = busqueda().toLowerCase();
    setFiltradas(vacantes().filter(v => 
      v.titulo_puesto.toLowerCase().includes(term) || 
      (v.nombre_comercial || '').toLowerCase().includes(term)
    ));
  };

  return (
    <div>
      <div class="row mb-4">
        <div class="col-md-8 mx-auto">
          <div class="input-group">
            <input type="text" class="form-control rounded-pill me-2" placeholder="Buscar vacantes..." 
                   onInput={(e) => { setBusqueda(e.target.value); buscar(); }} />
            <button class="btn btn-primary rounded-pill px-4" onClick={buscar}>Buscar</button>
          </div>
        </div>
      </div>
      <div class="row g-4">
        {filtradas().map(v => (
          <div class="col-md-6 col-lg-4">
            <TarjetaVacante vacante={v} />
          </div>
        ))}
        {filtradas().length === 0 && <div class="col-12 text-center py-5 text-muted">No se encontraron vacantes.</div>}
      </div>
    </div>
  );
}
