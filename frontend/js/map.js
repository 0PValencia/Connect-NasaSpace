let map;
let usuario = null;
let markersLayer;
let nasaDataLayer;
let departamentoSeleccionado = null;
let capasActivas = {
  incendios: false,
  ndvi: false,
  glaciares: false,
  contaminacion: false
};

window.onload = () => {
  map = L.map("map").setView([-17.5, -63], 5);
  
  // Mapa con colores vistosos - CartoDB Positron
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: "© OpenStreetMap contributors © CARTO",
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
  nasaDataLayer = L.layerGroup().addTo(map);

  // Cargar datos iniciales
  cargarRastros();
  cargarDepartamentos();
  crearControlesMapa();

  // Añadir rastro al hacer clic
  map.on("click", async (e) => {
    if (!usuario) return alert("Debes hacer login para marcar en el mapa.");
    const descripcion = prompt("Descripción del rastro:");
    if (descripcion) {
      await guardarRastro(usuario.id, e.latlng.lat, e.latlng.lng, descripcion);
      cargarRastros();
    }
  });

  // Refrescar rastros cada 5 segundos
  setInterval(cargarRastros, 5000);
};

// Funciones de login y registro
async function registrar() {
  const correo = document.getElementById("correo").value;
  const apodo = document.getElementById("apodo").value;
  const data = await registrarUsuario(correo, apodo);
  if (data.id) {
    // Registro exitoso, hacer login automático
    usuario = { id: data.id, correo: correo, apodo: apodo };
    ocultarPanelLogin();
  } else {
    document.getElementById("login-msg").innerText = data.error;
  }
}

async function login() {
  const correo = document.getElementById("correo").value;
  const data = await loginUsuario(correo);
  if (data.usuario) {
    usuario = data.usuario;
    ocultarPanelLogin();
  } else {
    document.getElementById("login-msg").innerText = data.error;
  }
}

// Función para ocultar el panel de login
function ocultarPanelLogin() {
  const loginPanel = document.getElementById("login-panel");
  loginPanel.style.display = "none";
}

// Cargar rastros en el mapa
async function cargarRastros() {
  const rastros = await obtenerRastros();
  markersLayer.clearLayers();
  rastros.forEach((r) => {
    // Punto simple azul para usuarios
    L.circleMarker([r.lat, r.lng], {
      radius: 6,
      fillColor: "#3498db",
      color: "#2980b9",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    })
      .bindPopup(`<b>👤 ${r.apodo}</b><br>📝 ${r.descripcion}`)
      .addTo(markersLayer);
  });
}

// ===== NUEVAS FUNCIONES PARA DATOS NASA =====

// Crear controles de mapa para las capas de datos
function crearControlesMapa() {
  const controlesDiv = document.createElement('div');
  controlesDiv.className = 'controles-mapa';
  controlesDiv.innerHTML = `
    <h4>Capas de Datos NASA</h4>
    <label><input type="checkbox" id="chk-incendios" onchange="toggleCapa('incendios')"> Incendios</label><br>
    <label><input type="checkbox" id="chk-ndvi" onchange="toggleCapa('ndvi')"> Cobertura Vegetal</label><br>
    <label><input type="checkbox" id="chk-glaciares" onchange="toggleCapa('glaciares')"> Glaciares</label><br>
    <label><input type="checkbox" id="chk-contaminacion" onchange="toggleCapa('contaminacion')"> Contaminación</label>
  `;
  
  document.getElementById('side-panel').appendChild(controlesDiv);
}

// Cargar lista de departamentos en el panel lateral
function cargarDepartamentos() {
  const departamentos = [
    { id: 'la-paz', nombre: 'La Paz' },
    { id: 'cochabamba', nombre: 'Cochabamba' },
    { id: 'santa-cruz', nombre: 'Santa Cruz' },
    { id: 'oruro', nombre: 'Oruro' },
    { id: 'potosi', nombre: 'Potosí' },
    { id: 'tarija', nombre: 'Tarija' },
    { id: 'chuquisaca', nombre: 'Chuquisaca' },
    { id: 'beni', nombre: 'Beni' },
    { id: 'pando', nombre: 'Pando' }
  ];

  const departamentosDiv = document.createElement('div');
  departamentosDiv.className = 'departamentos-lista';
  departamentosDiv.innerHTML = `
    <h4>Seleccionar Departamento</h4>
    ${departamentos.map(d => 
      `<button class="btn-depto" onclick="seleccionarDepartamento('${d.id}')">${d.nombre}</button>`
    ).join('')}
  `;
  
  document.getElementById('side-panel').appendChild(departamentosDiv);
}

// Seleccionar departamento y cargar sus datos
async function seleccionarDepartamento(departamentoId) {
  departamentoSeleccionado = departamentoId;
  
  try {
    const datos = await obtenerDatosDepartamento(departamentoId);
    mostrarDatosDepartamento(datos);
    
    // Centrar mapa en el departamento
    map.setView([datos.coordenadas.lat, datos.coordenadas.lng], 8);
  } catch (error) {
    console.error('Error cargando datos del departamento:', error);
    alert('Error cargando datos del departamento');
  }
}

// Mostrar datos del departamento en el panel lateral
function mostrarDatosDepartamento(datos) {
  const eventosDiv = document.getElementById('eventos');
  eventosDiv.innerHTML = `
    <h3>${datos.departamento} 🌍</h3>
    <div class="resumen-depto">
      <h4>Resumen (${datos.periodo.inicio} - ${datos.periodo.fin})</h4>
      <p><strong>Incendios:</strong> ${datos.resumen.total_incendios} eventos</p>
      <p><strong>Área quemada:</strong> ${datos.resumen.area_quemada_total} km²</p>
      <p><strong>Vegetación:</strong> ${datos.resumen.tendencia_vegetacion}</p>
      <p><strong>Glaciares:</strong> ${datos.resumen.tendencia_glaciares}</p>
    </div>
    
    <div class="eventos-detalle">
      ${datos.incendios.length > 0 ? `
        <h4>🔥 Incendios Recientes</h4>
        ${datos.incendios.map(incendio => `
          <div class="evento-item">
            <strong>${incendio.fecha}</strong><br>
            ${incendio.descripcion}<br>
            <small>Intensidad: ${incendio.intensidad} | Área: ${incendio.area_afectada} km²</small>
          </div>
        `).join('')}
      ` : ''}
      
      ${datos.cobertura_vegetal.length > 0 ? `
        <h4>🌱 Cobertura Vegetal</h4>
        ${datos.cobertura_vegetal.map(ndvi => `
          <div class="evento-item">
            <strong>${ndvi.fecha}</strong><br>
            ${ndvi.descripcion}<br>
            <small>NDVI: ${ndvi.valor_ndvi} | Tendencia: ${ndvi.tendencia}</small>
          </div>
        `).join('')}
      ` : ''}
      
      ${datos.glaciares.length > 0 ? `
        <h4>🏔️ Glaciares y Nieve</h4>
        ${datos.glaciares.map(glaciar => `
          <div class="evento-item">
            <strong>${glaciar.fecha}</strong><br>
            ${glaciar.descripcion}<br>
            <small>Cobertura: ${glaciar.cobertura_nieve}% | Tendencia: ${glaciar.tendencia}</small>
          </div>
        `).join('')}
      ` : ''}
      
      ${datos.contaminacion.length > 0 ? `
        <h4>🌫️ Contaminación del Aire</h4>
        ${datos.contaminacion.map(cont => `
          <div class="evento-item">
            <strong>${cont.fecha}</strong><br>
            ${cont.descripcion}<br>
            <small>CO: ${cont.nivel_co} ppm | Calidad: ${cont.calidad_aire}</small>
          </div>
        `).join('')}
      ` : ''}
    </div>
  `;
}

// Toggle de capas de datos NASA
async function toggleCapa(tipoCapa) {
  const checkbox = document.getElementById(`chk-${tipoCapa}`);
  capasActivas[tipoCapa] = checkbox.checked;
  
  if (checkbox.checked) {
    await cargarCapaDatos(tipoCapa);
  } else {
    limpiarCapaDatos(tipoCapa);
  }
}

// Cargar datos de una capa específica
async function cargarCapaDatos(tipoCapa) {
  try {
    const anio = '2023'; // Año por defecto
    let datos;
    
    switch(tipoCapa) {
      case 'incendios':
        datos = await obtenerIncendios(anio);
        break;
      case 'ndvi':
        datos = await obtenerNDVI(anio);
        break;
      case 'glaciares':
        datos = await obtenerGlaciares(anio);
        break;
      case 'contaminacion':
        datos = await obtenerContaminacion(anio);
        break;
    }
    
    mostrarDatosEnMapa(datos, tipoCapa);
  } catch (error) {
    console.error(`Error cargando datos de ${tipoCapa}:`, error);
  }
}

// Mostrar datos en el mapa con iconos específicos
function mostrarDatosEnMapa(datos, tipoCapa) {
  const iconos = {
    incendios: L.divIcon({
      className: 'icono-incendio',
      html: '🔥',
      iconSize: [20, 20]
    }),
    ndvi: L.divIcon({
      className: 'icono-ndvi',
      html: '🌱',
      iconSize: [20, 20]
    }),
    glaciares: L.divIcon({
      className: 'icono-glaciar',
      html: '🏔️',
      iconSize: [20, 20]
    }),
    contaminacion: L.divIcon({
      className: 'icono-contaminacion',
      html: '🌫️',
      iconSize: [20, 20]
    })
  };
  
  datos.forEach(dato => {
    L.marker([dato.lat, dato.lng], { icon: iconos[tipoCapa] })
      .bindPopup(crearPopupContenido(dato, tipoCapa))
      .addTo(nasaDataLayer);
  });
}

// Crear contenido del popup según el tipo de dato
function crearPopupContenido(dato, tipoCapa) {
  let contenido = `<b>${tipoCapa.toUpperCase()}</b><br>`;
  
  switch(tipoCapa) {
    case 'incendios':
      contenido += `
        <strong>${dato.departamento}</strong><br>
        Fecha: ${dato.fecha}<br>
        Intensidad: ${dato.intensidad}<br>
        Área: ${dato.area_afectada} km²<br>
        ${dato.descripcion}
      `;
      break;
    case 'ndvi':
      contenido += `
        <strong>${dato.departamento}</strong><br>
        Fecha: ${dato.fecha}<br>
        NDVI: ${dato.valor_ndvi}<br>
        Tendencia: ${dato.tendencia}<br>
        ${dato.descripcion}
      `;
      break;
    case 'glaciares':
      contenido += `
        <strong>${dato.departamento}</strong><br>
        Fecha: ${dato.fecha}<br>
        Cobertura: ${dato.cobertura_nieve}%<br>
        Tendencia: ${dato.tendencia}<br>
        ${dato.descripcion}
      `;
      break;
    case 'contaminacion':
      contenido += `
        <strong>${dato.departamento}</strong><br>
        Fecha: ${dato.fecha}<br>
        CO: ${dato.nivel_co} ppm<br>
        Calidad: ${dato.calidad_aire}<br>
        ${dato.descripcion}
      `;
      break;
  }
  
  return contenido;
}

// Limpiar capa de datos específica
function limpiarCapaDatos(tipoCapa) {
  // En una implementación más avanzada, podrías mantener referencias específicas
  // a cada capa. Por ahora, limpiamos toda la capa de datos NASA.
  nasaDataLayer.clearLayers();
}
