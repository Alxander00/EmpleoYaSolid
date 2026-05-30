jsx
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { api } from '../services/api';

export default function CrearVacante() {
  const navigate = useNavigate();
  const [form, setForm] = createSignal({
    titulo_puesto: '',
    modalidad: 'PRESENCIAL',
    descripcion_puesto: '',
    requisitos: '',
    beneficios: '',
    ubicacion_especifica: '',
    rango_salarial_min: '',
    rango_salarial_max: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/vacantes', form());
      alert('Vacante publicada exitosamente');
      navigate('/empresa');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h2 class="fw-bold mb-4">Publicar nueva vacante</h2>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label fw-semibold">Título del puesto *</label>
              <input type="text" class="form-control rounded-pill" required onInput={(e) => setForm({...form(), titulo_puesto: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Modalidad *</label>
              <select class="form-select rounded-pill" required onInput={(e) => setForm({...form(), modalidad: e.target.value})}>
                <option value="PRESENCIAL">Presencial</option>
                <option value="REMOTO">Remoto</option>
                <option value="HIBRIDO">Híbrido</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Ubicación (ciudad)</label>
              <input type="text" class="form-control rounded-pill" onInput={(e) => setForm({...form(), ubicacion_especifica: e.target.value})} />
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Salario mínimo (USD)</label>
                <input type="number" class="form-control rounded-pill" onInput={(e) => setForm({...form(), rango_salarial_min: e.target.value})} />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Salario máximo (USD)</label>
                <input type="number" class="form-control rounded-pill" onInput={(e) => setForm({...form(), rango_salarial_max: e.target.value})} />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Descripción del puesto *</label>
              <textarea class="form-control rounded-4" rows="4" required onInput={(e) => setForm({...form(), descripcion_puesto: e.target.value})}></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Requisitos *</label>
              <textarea class="form-control rounded-4" rows="3" required onInput={(e) => setForm({...form(), requisitos: e.target.value})}></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Beneficios</label>
              <textarea class="form-control rounded-4" rows="3" onInput={(e) => setForm({...form(), beneficios: e.target.value})}></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold">Publicar vacante</button>
          </form>
        </div>
      </div>
    </div>
  );
}
