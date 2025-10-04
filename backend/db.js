const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "terra.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      correo TEXT UNIQUE NOT NULL,
      apodo TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rastros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      lat REAL,
      lng REAL,
      descripcion TEXT,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);
});

module.exports = db;
