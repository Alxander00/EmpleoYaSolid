import { createSignal, onMount } from 'solid-js';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { usuario } = useAuth();
  const [usuarios, setUsuarios] = createSignal([]);

  onMount(async () => {
    if (usuario()?.rol === 'ADMINISTRADOR') {
      const datos = await api.get('/admin/usuarios');
      setUsuarios(datos);
    }
  });

  const cambiarEstado = async (id, accion) => {
    await api.patch(`/admin/usuarios/${id}/${accion}`);
    setUsuarios(usuarios().map(u => u.id === id ? { ...u, estado: accion === 'activar' ? 'ACTIVO' : 'SUSPENDIDO' } : u));
  };

  return (
    <div>
      <h2 class="fw-bold mb-4">Panel de administración</h2>
      <div class="card p-4 shadow-sm border-0 rounded-4">
        <h5>Usuarios registrados</h5>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {usuarios().map(u => (
                <tr>
                  <td>{u.correo_electronico}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  <td>
                    {u.estado === 'ACTIVO' ? 
                      <button class="btn btn-sm btn-warning" onClick={() => cambiarEstado(u.id, 'suspender')}>Suspender</button> :
                      <button class="btn btn-sm btn-success" onClick={() => cambiarEstado(u.id, 'activar')}>Activar</button>
                    }
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
