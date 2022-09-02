// MOD
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// CONFIG
app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDD
app.use(express.static(path.join(__dirname, "public")));
app.use("/", (req, res) => {
    let head = fs.readFileSync("src/views/head.html");
    let footer = fs.readFileSync("src/views/footer.html");
    let fl = fs.readFileSync("src/views/index.ejs", "utf8");
    let archivo = fl.replace("{%HEAD%}", head);
    archivo = archivo.replace("{%FOOTER%}", footer);
    res.send(archivo);
});

// SRV
app.listen(app.get("port"), () => {
    console.log("Client: http://localhost:" + app.get("port"));
})