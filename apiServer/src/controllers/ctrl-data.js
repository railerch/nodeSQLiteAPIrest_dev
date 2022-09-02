const fs = require("fs");
const path = require("path");
const url = require("url");
const qs = require("querystring");

// Base de datos
const sqlite = require("sqlite3").verbose();
const dbName = path.join(__dirname, "../database/api_test_db.db")
const conn = new sqlite.Database(dbName, err => {
    if (err) {
        console.log("ERROR: " + err.message);
    } else {
        console.log("DB connection OK!");
    }

    /*
    conn.close(err => {
        if (err) console.log("ERROR CLOSING DB: " + err.message);
    })
    */

});

// Metodos de rutas
const pagina_inicio = (req, res) => {
    let head = fs.readFileSync("src/views/head.html");
    let footer = fs.readFileSync("src/views/footer.html");
    let index = fs.readFileSync("src/views/index.ejs", "utf8");

    let archivo = index.replace("{%HEAD%}", head);
    archivo = archivo.replace("{%FOOTER%}", footer);
    res.send(archivo);
}

const usuarios = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    conn.all(sql, (err, rows) => {
        if (err) {
            res.json({ res: err.message });
        } else {
            res.json(rows);
        }
    });
}

const empresas = (req, res) => {
    const sql = "SELECT * FROM empresas";
    conn.all(sql, (err, rows) => {
        if (err) {
            res.json({ res: err.message });
        } else {
            res.json(rows);
        }
    });
}

const crear_registro = (req, res) => {
    const datos = req.body;
    let colTmp = Object.keys(datos);

    // Columnas
    let columnas = [];
    colTmp.forEach(col => {
        if (col != "tabla") {
            columnas.push(col);
        }
    })

    // Binding
    let binds = [];
    columnas.forEach(col => {
        if (col != "tabla") {
            binds.push('?')
        }
    });

    // Registro
    let registro = [];
    for (let reg in datos) {
        if (reg != "tabla") {
            registro.push(datos[reg])
        }
    }

    let sql = `INSERT INTO ${datos.tabla} (${columnas.toString()}) VALUES (${binds.toString()})`;

    conn.run(sql, registro, err => {
        if (err) {
            res.send(err.message);
        } else {
            res.json({ status: true, registro: req.body });
        }
    })

}

module.exports = {
    pagina_inicio,
    usuarios,
    empresas,
    crear_registro
}