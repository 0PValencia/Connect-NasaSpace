const express = require("express");
const cors = require("cors");
const db = require("./db");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const NASA_API_KEY = "L5AzKARqX636RqJsZ5gm4Z0fyuVyYUi7mvUlSg1T";
const BOLIVIA_BOUNDS = { south:-22.9, west:-69.6, north:-9.7, east:-57.5 };

// ---------- ENDPOINTS USUARIOS ----------
app.post("/register", (req, res) => {
  const { correo, apodo } = req.body;
  if(!correo || !apodo) return res.status(400).json({ error:"Correo y apodo requeridos" });

  db.run(`INSERT INTO usuarios (correo, apodo) VALUES (?, ?)`, [correo, apodo], function(err){
    if(err) return res.status(400).json({ error:"Correo ya registrado" });
    res.json({ message:"Usuario registrado", id:this.lastID });
  });
});

app.post("/login", (req,res)=>{
  const { correo } = req.body;
  db.get(`SELECT * FROM usuarios WHERE correo = ?`, [correo], (err,row)=>{
    if(err) return res.status(500).json({ error:"Error en BD" });
    if(!row) return res.status(401).json({ error:"Usuario no encontrado" });
    res.json({ message:"Login exitoso", usuario:row });
  });
});

// ---------- ENDPOINT RASTROS ----------
app.get("/rastros", (req, res) => {
  db.all( 
    `SELECT r.id, r.lat, r.lng, r.descripcion, u.apodo 
     FROM rastros r JOIN usuarios u ON r.usuario_id = u.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error en la BD" });
      res.json(rows);
    }
  );
});

app.post("/rastro", (req,res)=>{
  const { usuario_id, lat, lng, descripcion } = req.body;
  if(!usuario_id || !lat || !lng) return res.status(400).json({ error:"Datos incompletos" });

  db.run(`INSERT INTO rastros (usuario_id, lat, lng, descripcion) VALUES (?,?,?,?)`,
    [usuario_id, lat, lng, descripcion||""], function(err){
      if(err) return res.status(500).json({ error:"Error guardando rastro" });
      res.json({ message:"Rastro guardado", id:this.lastID });
  });
});

app.delete("/limpiar", (req,res)=>{
  db.run("DELETE FROM rastros", ()=>{
    db.run("DELETE FROM usuarios", ()=>res.json({ message:"BD limpiada" }));
  });
});

// ---------- ENDPOINT EVENTOS CON FILTRO ----------
app.get("/eventos", async (req,res)=>{
  const { tipo, anio } = req.query;
  if(!tipo || !anio) return res.status(400).json({ error:"Debe indicar tipo y año" });

  try{
    let datos;
    switch(tipo){
      case "incendios":
        datos = await obtenerDatosIncendios(anio);
        break;
      case "ndvi":
        datos = await obtenerDatosNDVI(anio);
        break;
      case "glaciares":
        datos = await obtenerDatosGlaciares(anio);
        break;
      case "contaminacion":
        datos = await obtenerDatosContaminacion(anio);
        break;
      default:
        return res.status(400).json({ error:"Tipo de evento no válido" });
    }
    res.json(datos);
  }catch(e){
    console.error(e);
    res.status(500).json({ error:"Error obteniendo datos" });
  }
});

// ---------- FUNCIONES AUXILIARES ----------
async function obtenerDatosIncendios(anio){
  try {
    const bbox = `${BOLIVIA_BOUNDS.south},${BOLIVIA_BOUNDS.west},${BOLIVIA_BOUNDS.north},${BOLIVIA_BOUNDS.east}`;
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${NASA_API_KEY}/MODIS_NRT/${bbox}/1`;
    console.log(`Obteniendo datos de incendios para ${anio} desde: ${url}`);
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }
    
    const text = await res.text();
    console.log(`Datos recibidos: ${text.length} caracteres`);
    
    const lines = text.split("\n").filter(line => line.trim());
    if (lines.length < 2) {
      console.log("No hay datos de incendios disponibles");
      return [];
    }
    
    const headers = lines[0].split(",");
    const data = lines.slice(1)
      .map(line => {
        const values = line.split(",");
        const obj = {};
        headers.forEach((header, i) => {
          obj[header] = values[i] || "";
        });
        return obj;
      })
      .filter(e => e.acq_date && e.acq_date.startsWith(anio))
      .map(incendio => ({
        lat: parseFloat(incendio.latitude),
        lng: parseFloat(incendio.longitude),
        fecha: incendio.acq_date,
        hora: incendio.acq_time,
        confianza: parseInt(incendio.confidence) || 0,
        satelite: incendio.satellite || "MODIS",
        departamento: obtenerDepartamentoPorCoordenadas(parseFloat(incendio.latitude), parseFloat(incendio.longitude)),
        descripcion: `Incendio detectado por ${incendio.satellite || "MODIS"} - Confianza: ${incendio.confidence || "N/A"}%`
      }));
    
    console.log(`Procesados ${data.length} incendios para el año ${anio}`);
    return data;
  } catch (error) {
    console.error("Error obteniendo datos de incendios:", error);
    // Retornar datos simulados en caso de error
    return [{
      lat: -17.8,
      lng: -63.2,
      fecha: `${anio}-08-15`,
      hora: "1400",
      confianza: 85,
      satelite: "MODIS",
      departamento: "Santa Cruz",
      descripcion: "Datos simulados - Error en API"
    }];
  }
}

// Función auxiliar para determinar departamento por coordenadas
function obtenerDepartamentoPorCoordenadas(lat, lng) {
  // Coordenadas aproximadas de los centros de departamentos
  const departamentos = [
    { nombre: "Santa Cruz", lat: -17.8, lng: -63.2 },
    { nombre: "La Paz", lat: -16.5, lng: -68.2 },
    { nombre: "Cochabamba", lat: -17.4, lng: -66.2 },
    { nombre: "Potosí", lat: -19.6, lng: -65.8 },
    { nombre: "Oruro", lat: -17.97, lng: -67.1 },
    { nombre: "Tarija", lat: -21.5, lng: -64.7 },
    { nombre: "Chuquisaca", lat: -19.0, lng: -65.3 },
    { nombre: "Beni", lat: -14.8, lng: -64.9 },
    { nombre: "Pando", lat: -11.0, lng: -68.8 }
  ];
  
  let deptoMasCercano = departamentos[0];
  let distanciaMinima = Math.sqrt(Math.pow(lat - deptoMasCercano.lat, 2) + Math.pow(lng - deptoMasCercano.lng, 2));
  
  departamentos.forEach(depto => {
    const distancia = Math.sqrt(Math.pow(lat - depto.lat, 2) + Math.pow(lng - depto.lng, 2));
    if (distancia < distanciaMinima) {
      distanciaMinima = distancia;
      deptoMasCercano = depto;
    }
  });
  
  return deptoMasCercano.nombre;
}

// Datos simulados para NDVI, glaciares y contaminacion
async function obtenerDatosNDVI(anio){
  return [
    { 
      lat: -17.8, 
      lng: -63.2, 
      fecha: `${anio}-06-15`, 
      valor_ndvi: 0.45, 
      tendencia: "decreciente",
      departamento: "Santa Cruz",
      descripcion: "Reducción de cobertura vegetal en Chiquitania"
    },
    {
      lat: -16.2,
      lng: -67.7,
      fecha: `${anio}-05-20`,
      valor_ndvi: 0.72,
      tendencia: "estable",
      departamento: "La Paz",
      descripcion: "Cobertura vegetal estable en Yungas"
    }
  ];
}

async function obtenerDatosGlaciares(anio){
  return [
    {
      lat: -16.6,
      lng: -67.8,
      fecha: `${anio}-08-01`,
      cobertura_nieve: 45.2,
      tendencia: "decreciente",
      departamento: "La Paz",
      descripcion: "Reducción de cobertura de nieve en Illimani"
    },
    {
      lat: -18.1,
      lng: -69.0,
      fecha: `${anio}-07-15`,
      cobertura_nieve: 32.8,
      tendencia: "decreciente",
      departamento: "Oruro",
      descripcion: "Retroceso glaciar en Sajama"
    }
  ];
}

async function obtenerDatosContaminacion(anio){
  return [
    {
      lat: -17.8,
      lng: -63.2,
      fecha: `${anio}-09-01`,
      nivel_co: 125.5,
      calidad_aire: "moderada",
      departamento: "Santa Cruz",
      descripcion: "Aumento de CO por incendios forestales"
    },
    {
      lat: -16.5,
      lng: -68.2,
      fecha: `${anio}-08-15`,
      nivel_co: 89.2,
      calidad_aire: "buena",
      departamento: "La Paz",
      descripcion: "Niveles normales de contaminación"
    }
  ];
}

// ---------- INICIAR SERVIDOR ----------
const PORT = 4000;
app.listen(PORT, ()=>console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));