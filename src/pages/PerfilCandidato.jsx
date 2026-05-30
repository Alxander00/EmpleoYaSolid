jsx
import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';

export default function PerfilCandidato() {
  const [perfil, setPerfil] = createSignal({
    nombres: '',
    apellidos: '',
    telefono_contacto: '',
    fecha_nacimiento: '',
    titular_profesional: '',
    resumen_biografico: '',
    habilidades_tecnicas: [],
    url_curriculum_pdf: '',
  });

  onMount(async () => {
    try {
      const datos = await api.get('/candidatos/mi-perfil');
      setPerfil(datos);
    } catch (err) {
      console.error('Perfil no encontrado');
    }
  });

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await api.post('/candidatos/mi-perfil', perfil());
      alert('Perfil actualizado correctamente');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card p-4 shadow-sm border-0 rounded-4">
          <h2 class="fw-bold mb-4">Mi perfil profesional</h2>
          <form onSubmit={guardar}>
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Nombres *</label>
                <input type="text" class="form-control rounded-pill" required value={perfil().nombres} onInput={(e) => setPerfil({...perfil(), nombres: e.target.value})} />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold">Apellidos *</label>
                <input type="text" class="form-control rounded-pill" required value={perfil().apellidos} onInput={(e) => setPerfil({...perfil(), apellidos: e.target.value})} />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Teléfono</label>
              <input type="tel" class="form-control rounded-pill" value={perfil().telefono_contacto} onInput={(e) => setPerfil({...perfil(), telefono_contacto: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Fecha de nacimiento</label>
              <input type="date" class="form-control rounded-pill" value={perfil().fecha_nacimiento?.split('T')[0] || ''} onInput={(e) => setPerfil({...perfil(), fecha_nacimiento: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Título profesional</label>
              <input type="text" class="form-control rounded-pill" value={perfil().titular_profesional} onInput={(e) => setPerfil({...perfil(), titular_profesional: e.target.value})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Habilidades (separadas por comas)</label>
              <input type="text" class="form-control rounded-pill" value={perfil().habilidades_tecnicas?.join(', ')} onInput={(e) => setPerfil({...perfil(), habilidades_tecnicas: e.target.value.split(',').map(s => s.trim())})} />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Resumen biográfico</label>
              <textarea class="form-control rounded-4" rows="4" value={perfil().resumen_biografico} onInput={(e) => setPerfil({...perfil(), resumen_biografico: e.target.value})}></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">URL de tu CV (PDF)</label>
              <input type="url" class="form-control rounded-pill" value={perfil().url_curriculum_pdf} onInput={(e) => setPerfil({...perfil(), url_curriculum_pdf: e.target.value})} />
            </div>
            <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold">Guardar cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
}
