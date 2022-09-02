// MOD
const express = require("express");
const app = express();
const path = require("path");
const data = require("./routes/routes-data");
const customCors = require("./middlewares/midd-cors");

// CONFIG
app.set("port", 8080);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDD
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(customCors);
app.use("/", data);

// SRV
app.listen(app.get("port"), () => {
    console.log("Server: http://localhost:" + app.get("port"));
})