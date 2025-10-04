const API_URL = "http://localhost:4000";

async function registrarUsuario(correo, apodo) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, apodo }),
  });
  return res.json();
}

async function loginUsuario(correo) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo }),
  });
  return res.json();
}

async function guardarRastro(usuario_id, lat, lng, descripcion) {
  const res = await fetch(`${API_URL}/rastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id, lat, lng, descripcion }),
  });
  return res.json();
}

async function obtenerRastros() {
  const res = await fetch(`${API_URL}/rastros`);
  return res.json();
}

// ===== FUNCIONES PARA DATOS NASA =====

// Nueva función unificada para obtener eventos por tipo y año
async function obtenerEventos(tipo, anio) {
  const res = await fetch(`${API_URL}/eventos?tipo=${tipo}&anio=${anio}`);
  return res.json();
}

// Funciones específicas para compatibilidad
async function obtenerIncendios(anio) {
  return obtenerEventos("incendios", anio);
}

async function obtenerNDVI(anio) {
  return obtenerEventos("ndvi", anio);
}

async function obtenerGlaciares(anio) {
  return obtenerEventos("glaciares", anio);
}

async function obtenerContaminacion(anio) {
  return obtenerEventos("contaminacion", anio);
}

// Función para limpiar la base de datos
async function limpiarBaseDatos() {
  const res = await fetch(`${API_URL}/limpiar`, { method: "DELETE" });
  return res.json();
}