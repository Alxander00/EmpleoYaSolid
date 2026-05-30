import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';
import TarjetaForo from '../components/TarjetaForo';

export default function Foros() {
  const [posts, setPosts] = createSignal([]);

  onMount(async () => {
    const datos = await api.get('/foros');
    setPosts(datos);
  });

  return (
    <div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold"><i class="bi bi-chat-dots-fill text-primary me-2"></i>Foro de la comunidad</h2>
      </div>
      <div class="row">
        <div class="col-lg-8">
          {posts().map(post => <TarjetaForo post={post} />)}
          {posts().length === 0 && <div class="text-center py-5 text-muted">No hay publicaciones aún.</div>}
        </div>
        <div class="col-lg-4">
          <div class="card p-4 border-0 shadow-sm rounded-4">
            <h6 class="fw-bold mb-3">Categorías populares</h6>
            <div class="list-group list-group-flush">
              <button class="list-group-item list-group-item-action border-0 small py-2">Entrevistas</button>
              <button class="list-group-item list-group-item-action border-0 small py-2">CV y currículum</button>
              <button class="list-group-item list-group-item-action border-0 small py-2">Programación</button>
              <button class="list-group-item list-group-item-action border-0 small py-2">Salarios</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
