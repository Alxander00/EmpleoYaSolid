const BASE_API = '/api';

export const api = {
  async peticion(endpoint, opciones = {}) {
    const token = localStorage.getItem('token');
    const cabeceras = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...opciones.headers,
    };
    const respuesta = await fetch(`${BASE_API}${endpoint}`, { ...opciones, headers: cabeceras });
    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok) throw new Error(datos.error || 'Error en la petición');
    return datos;
  },
  get: (endpoint) => api.peticion(endpoint),
  post: (endpoint, cuerpo) => api.peticion(endpoint, { method: 'POST', body: JSON.stringify(cuerpo) }),
  put: (endpoint, cuerpo) => api.peticion(endpoint, { method: 'PUT', body: JSON.stringify(cuerpo) }),
  patch: (endpoint, cuerpo) => api.peticion(endpoint, { method: 'PATCH', body: JSON.stringify(cuerpo) }),
  delete: (endpoint) => api.peticion(endpoint, { method: 'DELETE' }),
};