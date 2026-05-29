
import { Link, useLocation } from '@solidjs/router';
import { useAuth } from '../context/AuthContext';

export default function BarraNavegacion() {
  const { usuario, cerrarSesion } = useAuth();
  const ubicacion = useLocation();
  const esActivo = (ruta) => ubicacion.pathname === ruta;

  return (
    <nav class="navbar navbar-expand-lg bg-white py-3 shadow-sm sticky-top border-bottom">
      <div class="container">
        <Link href="/" class="navbar-brand fw-bold text-primary fs-3">
          Empleo<span class="text-dark">Ya</span>
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarPrincipal">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><Link href="/" class={`nav-link ${esActivo('/') ? 'active' : ''}`}>Inicio</Link></li>
            <li class="nav-item"><Link href="/vacantes" class={`nav-link ${esActivo('/vacantes') ? 'active' : ''}`}>Vacantes</Link></li>
            <li class="nav-item"><Link href="/foros" class={`nav-link ${esActivo('/foros') ? 'active' : ''}`}>Foros</Link></li>
            <li class="nav-item"><Link href="/recursos" class={`nav-link ${esActivo('/recursos') ? 'active' : ''}`}>Recursos</Link></li>
            {usuario()?.rol === 'CANDIDATO' && (
              <>
                <li class="nav-item"><Link href="/mis-postulaciones" class={`nav-link ${esActivo('/mis-postulaciones') ? 'active' : ''}`}>Mis postulaciones</Link></li>
                <li class="nav-item"><Link href="/perfil-candidato" class={`nav-link ${esActivo('/perfil-candidato') ? 'active' : ''}`}>Mi perfil</Link></li>
              </>
            )}
            {usuario()?.rol === 'EMPRESA' && (
              <>
                <li class="nav-item"><Link href="/empresa" class={`nav-link ${esActivo('/empresa') ? 'active' : ''}`}>Mis vacantes</Link></li>
                <li class="nav-item"><Link href="/perfil-empresa" class={`nav-link ${esActivo('/perfil-empresa') ? 'active' : ''}`}>Perfil empresa</Link></li>
              </>
            )}
          </ul>
          <div class="d-flex gap-2">
            {!usuario() ? (
              <>
                <Link href="/login" class="btn btn-outline-primary rounded-pill px-4">Iniciar sesión</Link>
                <Link href="/registro" class="btn btn-primary rounded-pill px-4">Registrarse</Link>
              </>
            ) : (
              <>
                <span class="text-muted small me-2">{usuario().correo_electronico}</span>
                <button onClick={cerrarSesion} class="btn btn-outline-danger rounded-pill btn-sm">Cerrar sesión</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
