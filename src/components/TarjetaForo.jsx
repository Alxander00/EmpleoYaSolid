
export default function TarjetaForo(props) {
  const post = () => props.post;
  return (
    <div class="card p-4 mb-3 border-0 shadow-sm rounded-4">
      <div class="d-flex gap-3 align-items-center mb-3">
        <div class="avatar-sm bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold">
          {post().autor_nombre?.[0] || 'U'}
        </div>
        <div>
          <h6 class="fw-bold mb-0 small">{post().autor_nombre}</h6>
          <small class="text-muted extra-small">{new Date(post().creado_el).toLocaleDateString()}</small>
        </div>
      </div>
      <h5 class="fw-bold text-dark">{post().titulo}</h5>
      <p class="text-muted small">{post().contenido?.substring(0, 120)}...</p>
    </div>
  );
}
